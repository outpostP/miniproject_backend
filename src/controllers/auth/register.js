const transporter = require('../../helpers/transporter');
const fs = require('fs').promises;
const handlebars = require('handlebars');
const {Op} = require('sequelize');
const db = require('../../models');
const users = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
    path: path.resolve("../.env"),
});

const checkIfExists = async (email, username, phone) => {
  const user = await users.findOne({
      where: {
          [Op.or]: [{ email }, { username }, { phone }]
      }
  });
  return user;
};

async function hashUserPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
async function createUser({ username, email, password, phone, transaction }) {
  return await users.create(
    {
      username,
      email,
      password,
      phone,
    },
    { transaction }
  );
}
async function sendVerificationEmail(email, username, token, redirect) {
  const data = await fs.readFile(path.resolve(__dirname, '../../email/registerEmail.html'), 'utf-8');
  const tempCompile = handlebars.compile(data);
  const tempResult = tempCompile({ email, username, token, redirect });
  await transporter.sendMail({
    to: email,
    subject: 'verify',
    html: tempResult
  });
}

// Function to generate JWT token
function generateToken(payload, jwtKey) {
  return jwt.sign(payload, jwtKey, {
    expiresIn: '1h',
  });
}

async function generateVerifToken(payload) {
  return generateToken(payload, process.env.JWT_KEY_VERIFY)
}

async function generateResetToken(payload) {
  return generateToken(payload, process.env.JWT_KEY_RESET)
}

const createUserAndSendEmail = async (username, email, password, phone) => {
  try {
    const hashPassword = await hashUserPassword(password);
    let result; 
    await db.sequelize.transaction(async (t) => {
      result = await createUser({
        username,
        email,
        password: hashPassword,
        phone,
        transaction: t,
      });
    });
    const { username: resultUsername, email: resultEmail, phone: resultPhone, id } = result.dataValues;
    const payload = {
      id,
    }
    
    const token = generateToken(payload, process.env.JWT_KEY_VERIFY);
    const redirect = `https://www.url.us/auth/verify/${token}`;
    await sendVerificationEmail(resultEmail, resultUsername, token, redirect);

  } catch (err) {
    throw new Error('register failed', err);
  }
};

  
  module.exports = {
    checkIfExists,
    createUserAndSendEmail, 
    generateVerifToken,
    generateResetToken,
    hashUserPassword
  };