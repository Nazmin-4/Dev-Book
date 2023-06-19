const Developer = require('../models/Developers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../config');
const registerDeveloper = async (req, res, next) => {
  try {
    const { username, password, name, skills, position, role, linkedinProfile, githubProfile, currentCompany } = req.body;

    // Check if the username already exists
    const existingDeveloper = await Developer.findOne({ username });
    if (existingDeveloper) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new developer
    const newDeveloper = new Developer({
      username,
      password: hashedPassword,
      name,
      skills,
      position,
      role,
      linkedinProfile,
      githubProfile,
      currentCompany,
    });

    // Save the developer to the database
    await newDeveloper.save();

    // Return success response
    res.status(201).json({ message: 'Developer registered successfully' });
  } catch (error) {
    next(error);
  }
};

const loginDeveloper = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const developer = await Developer.findOne({ username });
    if (!developer) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, developer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const payload = {
        id: developer.id, // Assuming developer.id represents the unique identifier of the developer
        // Include any other relevant data in the payload
      };
    // Generate JWT token
    const token = jwt.sign(payload, config.secretKey);

    // Return the token
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerDeveloper, loginDeveloper };
