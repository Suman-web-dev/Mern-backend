const Submission = require('../models/Submission');

// • Create new submission in database
// • Called when user submits abstract form
// • POST /api/submission
exports.createSubmission = async (req, res, next) => {
  try {
    // • Get submission data from request body
    const submissionData = req.body;

    // • Create new submission record in MongoDB
    const submission = await Submission.create(submissionData);

    // • Send created submission with 201 status
    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    // • Pass error to error handler middleware
    next(error);
  }
};

// • Get single submission by ID
// • Used to view or edit existing submission
// • GET /api/submission/:id
exports.getSubmission = async (req, res, next) => {
  try {
    // • Find submission in database using URL ID
    const submission = await Submission.findById(req.params.id);

    // • Send 404 if submission doesn't exist
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
      });
    }

    // • Send back submission data
    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// • Update existing submission
// • Used when user edits submission
// • PUT /api/submission/:id
exports.updateSubmission = async (req, res, next) => {
  try {
    // • Check if submission exists
    let submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
      });
    }

    // • Update with new data from request body
    // • new: true returns updated document
    // • runValidators: true ensures validation passes
    submission = await Submission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // • Send back updated submission
    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// • Delete submission from database
// • Used to permanently remove submission
// • DELETE /api/submission/:id
exports.deleteSubmission = async (req, res, next) => {
  try {
    // • Check if submission exists
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
      });
    }

    // • Delete submission from database
    await submission.deleteOne();

    // • Send success response
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// • Get all submissions
// • Returns all submissions with optional status filter
// • GET /api/submission
exports.getAllSubmissions = async (req, res, next) => {
  try {
    // • Get status filter from query params (optional)
    const { status } = req.query;
    
    // • Build query based on status filter
    const query = status ? { status } : {};
    
    // • Find all submissions matching query, sorted by newest first
    const submissions = await Submission.find(query).sort('-createdAt');

    // • Send submissions with count
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
};

// • Get all draft submissions
// • Returns submissions not yet submitted
// • GET /api/drafts
exports.getDrafts = async (req, res, next) => {
  try {
    // • Find all drafts, sorted by newest first
    const drafts = await Submission.find({ status: 'draft' }).sort('-createdAt');

    // • Send drafts with count
    res.status(200).json({
      success: true,
      count: drafts.length,
      data: drafts,
    });
  } catch (error) {
    next(error);
  }
};

// • Save draft version of submission
// • Similar to create but marks as draft
// • POST /api/save-draft
exports.saveDraft = async (req, res, next) => {
  try {
    // • Add draft status to submission data
    const draftData = {
      ...req.body,
      status: 'draft',
    };

    // • Create draft in database
    const submission = await Submission.create(draftData);

    // • Send back created draft
    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};
