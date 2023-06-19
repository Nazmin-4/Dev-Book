const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  skills: { type: [String] },
  position: { type: String },
  role: { type: String },
  linkedinProfile: { type: String },
  githubProfile: { type: String },
  currentCompany: { type: String },
});

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
