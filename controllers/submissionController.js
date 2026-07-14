const Submission = require('../models/Submission');

// Create new submission in database - POST /api/submission
exports.createSubmission = async (req, res, next) => {
  try {
    const submissionData = {
      ...req.body,
      status: 'submitted',
    };
    const submission = await Submission.create(submissionData);
    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// Get single submission by ID - GET /api/submission/:id
exports.getSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
      });
    }
    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// Update existing submission - PUT /api/submission/:id
exports.updateSubmission = async (req, res, next) => {
  try {
    let submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
      });
    }
    submission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// Delete submission from database - DELETE /api/submission/:id
exports.deleteSubmission = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
      });
    }
    await submission.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// Get all submissions with optional status filter - GET /api/submission
exports.getAllSubmissions = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const submissions = await Submission.find(query).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
};

// Get all draft submissions - GET /api/submission/drafts
exports.getDrafts = async (req, res, next) => {
  try {
    const drafts = await Submission.find({ status: 'draft' }).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: drafts.length,
      data: drafts,
    });
  } catch (error) {
    next(error);
  }
};

// Save draft version of submission - POST /api/submission/save-draft
exports.saveDraft = async (req, res, next) => {
  try {
    const draftData = {
      ...req.body,
      status: 'draft',
    };
    const submission = await Submission.create(draftData);
    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};
