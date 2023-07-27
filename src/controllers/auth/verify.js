const path = require("path");
require("dotenv").config({
    path: path.resolve("../.env"),
});
const db = require('../../models');
const users = db.user;
const jwt = require("jsonwebtoken");


const verifyToken = async (token) => {
    try {
        const verifier = process.env.JWT_KEY_VERIFY;
        const decode = jwt.verify(token, verifier);
        return decode.id;
    } catch (err) {
        throw new Error('Invalid token');
    }
};

const getUserById = async (userId) => {
    const user = await users.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const isUserVerified = (user) => {
    return user.isVerified;
};

const markUserAsVerified = async (userId) => {
    await db.sequelize.transaction(async (t) => {
        await users.update(
            { isVerified: true },
            {
                where: {
                    id: userId,
                },
                transaction: t,
            }
        );
    });
};

const markUserAsUnverified = async (userId) => {
    await db.sequelize.transaction(async (t) => {
        await users.update(
            { isVerified: false },
            {
                where: {
                    id: userId,
                },
                transaction: t,
            }
        );
    });
};

module.exports = {verifyToken, getUserById, isUserVerified, markUserAsVerified}