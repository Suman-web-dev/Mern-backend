const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission,
  getAllSubmissions,
  getDrafts,
  saveDraft,
} = require('../controllers/submissionController');

const upload = require('../middleware/upload');

// Routes handle all submission-related API endpoints
router.route('/drafts').get(getDrafts);
router.route('/save-draft').post(saveDraft);
router.route('/').get(getAllSubmissions).post(createSubmission);
router.route('/:id').get(getSubmission).put(updateSubmission).delete(deleteSubmission);

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded',
    });
  }

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
