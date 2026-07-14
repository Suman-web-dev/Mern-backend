const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission,
  getDrafts,
  saveDraft,
} = require('../controllers/submissionController');

const upload = require('../middleware/upload');

// • Routes handle all submission-related API endpoints
// • Connect URL paths to controller functions

// • Main submission routes
// • POST /api/submission - Create new submission
// • GET /api/submission/:id - Get single submission
// • PUT /api/submission/:id - Update submission
// • DELETE /api/submission/:id - Delete submission
router.route('/').post(createSubmission);
router.route('/:id').get(getSubmission).put(updateSubmission).delete(deleteSubmission);

// • Draft-specific routes
// • GET /api/submission/drafts - Get all draft submissions
// • POST /api/submission/save-draft - Save draft
router.route('/drafts').get(getDrafts);
router.route('/save-draft').post(saveDraft);

// • File upload route
// • POST /api/submission/upload - Upload file
router.post('/upload', upload.single('file'), (req, res) => {
  // • Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded',
    });
  }

  // • Send back file information
  res.status(200).json({
    success: true,
    data: {
      id: Date.now().toString(),
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
      url: `/uploads/${req.file.filename}`,
    },
  });
});

module.exports = router;
