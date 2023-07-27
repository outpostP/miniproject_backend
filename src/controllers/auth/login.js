const path = require("path");
require("dotenv").config({
    path: path.resolve("../.env"),
});
const db = require('../../models');
const users = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const buildQuery = (email, username, phone) => {
    let query = {};
  
    if (email) {
      query.email = email;
    }
  
    if (username) {
      query.username = username;
    }
  
    if (phone) {
      query.phone = phone;
    }
  
    return query;
  };
  
  const findUser = async (query) => {
    return await users.findOne({ where: query });
  };
  
  const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };
  
  const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY_LOGIN, { expiresIn: '240h' });
  };

  module.exports = {buildQuery, findUser, validatePassword, generateToken}