# ARCC Abstract Submission - Backend

Express.js backend API for the ARCC Abstract Submission System.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Features

- RESTful API for submission management
- File upload with validation
- Draft saving functionality
- MongoDB integration
- Error handling middleware
- File type and size validation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas connection string
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/arcc-submission
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Project Structure

```
back-end/
├── config/              # Configuration files
│   └── database.js     # MongoDB connection
├── controllers/         # Route controllers
│   └── submissionController.js
├── middleware/          # Custom middleware
│   ├── errorHandler.js # Error handling
│   └── upload.js       # Multer configuration
├── models/              # Mongoose models
│   └── Submission.js   # Submission schema
├── routes/              # API routes
│   └── submission.js   # Submission routes
├── uploads/             # Uploaded files directory
├── server.js           # Entry point
└── package.json
```

## API Endpoints

### Submission Routes

- `POST /api/submission` - Create a new submission
- `GET /api/submission/:id` - Get a single submission
- `PUT /api/submission/:id` - Update a submission
- `DELETE /api/submission/:id` - Delete a submission

### Draft Routes

- `GET /api/submission/drafts` - Get all drafts
- `POST /api/submission/save-draft` - Save a draft

### File Upload

- `POST /api/submission/upload` - Upload a file

### Health Check

- `GET /health` - Server health status

## Data Models

### Submission Schema

```javascript
{
  // Abstract Information
  journal: String,
  presentationType: String,
  researchArea: String,
  keywords: String,
  year: String,
  duration: String,

  // Presenter Details
  presenter: {
    name: String,
    email: String,
    phone: String,
    institution: String,
    department: String,
    country: String,
    orcid: String
  },

  // Co Authors
  coAuthors: [{
    id: String,
    name: String,
    email: String,
    institution: String,
    country: String,
    orcid: String
  }],

  // Abstract
  abstract: String,
  biography: String,

  // Files
  files: {
    abstract: { id, name, size, type, url },
    fullPaper: { id, name, size, type, url },
    supplementary: { id, name, size, type, url }
  },

  // Declaration
  consentToPublish: Boolean,
  consentToDataProcessing: Boolean,
  confirmAvailability: Boolean,

  // Status
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected',

  createdAt: Date,
  updatedAt: Date
}
```

## File Upload

- **Accepted formats**: PDF, DOC, DOCX
- **Maximum size**: 10MB per file
- **Storage location**: `uploads/` directory
- **Validation**: File type and size checked before upload

## Error Handling

The API includes comprehensive error handling for:
- Invalid MongoDB ObjectId
- Duplicate field values
- Validation errors
- File upload errors
- Server errors

All errors return a consistent JSON format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## CORS

The API is configured to accept requests from the frontend. Update the CORS origin in `server.js` for production.

## Development

The server supports hot-reload when using `npm run dev` with nodemon.

## Production

For production deployment:
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Use a secure JWT_SECRET
5. Set up proper file storage (e.g., AWS S3)
