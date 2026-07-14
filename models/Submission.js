const mongoose = require('mongoose');

// • Presenter schema: defines presenter's personal information
// • Presenter is main person who will present abstract
const presenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Presenter name is required'],
  },
  email: {
    type: String,
    required: [true, 'Presenter email is required'],
    lowercase: true, // • Auto-convert to lowercase
    trim: true, // • Remove extra spaces
  },
  phone: {
    type: String,
    required: [true, 'Presenter phone number is required'],
  },
  institution: {
    type: String,
    required: [true, 'Presenter institution is required'],
  },
  department: {
    type: String,
    required: [true, 'Presenter department is required'],
  },
  country: {
    type: String,
    required: [true, 'Presenter country is required'],
  },
  orcid: {
    type: String,
    default: '', // • Optional field, defaults to empty string
  },
});

// • Co-author schema: defines information about co-authors
// • Co-authors are other people who contributed to the work
const coAuthorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Co-author ID is required'],
  },
  name: {
    type: String,
    required: [true, 'Co-author name is required'],
  },
  email: {
    type: String,
    required: [true, 'Co-author email is required'],
    lowercase: true,
    trim: true,
  },
  institution: {
    type: String,
    required: [true, 'Co-author institution is required'],
  },
  country: {
    type: String,
    required: [true, 'Co-author country is required'],
  },
  orcid: {
    type: String,
    default: '',
  },
});

// • File schema: defines information about uploaded files
// • Stores metadata about file, not the file itself
const fileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'File ID is required'],
  },
  name: {
    type: String,
    required: [true, 'File name is required'],
  },
  size: {
    type: Number,
    required: [true, 'File size is required'],
  },
  type: {
    type: String,
    required: [true, 'File type is required'],
  },
  url: {
    type: String,
    required: [true, 'File URL is required'],
  },
});

// • Main submission schema: contains all abstract submission information
const submissionSchema = new mongoose.Schema(
  {
    // • Abstract information
    journal: {
      type: String,
      required: [true, 'Journal is required'],
    },
    presentationType: {
      type: String,
      required: [true, 'Presentation type is required'],
    },
    researchArea: {
      type: String,
      required: [true, 'Research area is required'],
    },
    keywords: {
      type: String,
      required: [true, 'Keywords are required'],
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },

    // • Presenter information (embedded document)
    presenter: {
      type: presenterSchema,
      required: [true, 'Presenter information is required'],
    },

    // • Co-authors list (array of embedded documents)
    coAuthors: {
      type: [coAuthorSchema],
      default: [], // • Defaults to empty array if no co-authors
    },

    // • Abstract text and presenter biography
    abstract: {
      type: String,
      required: [true, 'Abstract text is required'],
    },
    biography: {
      type: String,
      required: [true, 'Biography is required'],
    },

    // • Uploaded files information
    files: {
      abstract: fileSchema,
      fullPaper: fileSchema,
      supplementary: fileSchema,
    },

    // • Consent checkboxes user must agree to
    consentToPublish: {
      type: Boolean,
      required: [true, 'Consent to publish is required'],
      default: false,
    },
    consentToDataProcessing: {
      type: Boolean,
      required: [true, 'Consent to data processing is required'],
      default: false,
    },
    confirmAvailability: {
      type: Boolean,
      required: [true, 'Availability confirmation is required'],
      default: false,
    },

    // • Current submission status
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'accepted', 'rejected'],
      default: 'draft', // • New submissions start as drafts
    },
  },
  {
    timestamps: true, // • Auto-add createdAt and updatedAt fields
  }
);

// • Create and export Mongoose model
module.exports = mongoose.model('Submission', submissionSchema);
