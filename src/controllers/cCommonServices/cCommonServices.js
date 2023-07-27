const db = require('../../models');
const users = db.user;
const fs = require('fs');

const getUserInstance = async (req) => {
    try {
        return await users.findByPk(req.user.id);
    } catch (err) {
        throw new Error('Failed to get user instance');
    }
};

const executeTransaction = async (id,field, update) => {
    try {
        await db.sequelize.transaction(async (t) => {
            await users.update(
                { [field]: update },
                { where: { id: id } },
                { transaction: t }
            );
        });
    } catch (error) {
        throw new Error(`Failed to update in transaction: ${error.message}`);
    }
};

const executeEmailChange = async (id,field, update) => {
    try {
        await db.sequelize.transaction(async (t) => {
            await users.update(
                { [field]: update, isVerified: false },
                { where: { id: id } },
                { transaction: t }
            );
        });
    } catch (error) {
        throw new Error(`Failed to update username in transaction: ${error.message}`);
    }
};

    const checkUser = async (req) => {
        try {
            const userId = await users.findByPk(req.user.id);
            if (!userId) {
                throw new Error ('no user registered') 
            }
            return userId
        }   
         catch (error) {
            throw new Error(`Error during username validation: ${error.message}`);
        }
    };

async function takeUserProp(update) {
    const { email, username, phone } = update;
    return { email, username, phone };
  };

async function getByEmail(email) {
    try {
        const getemail = await users.findOne({
         where: {
              email: email
        }
        });
        return getemail
    }
    catch (err) {
        console.error('error fetching the user', err)
        throw err
    }
};

const deleteOldAvatar = (imgProfile, callback) => {
    fs.unlink(imgProfile, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.warn('Avatar file not found:', imgProfile);
            } else {
                console.error('Error deleting old avatar:', err);
            }
        }
        if (typeof callback === 'function') {
            callback(err);
        }
    });
};


const updateUserAvatar = async (userId, avatarPath) => {
    try {
        await db.sequelize.transaction(async (t) => {
            await users.update(
                {
                    imgProfile: avatarPath
                },
                {
                    where: {
                        id: userId
                    }
                },
                { transaction: t }
            );
        });
    } catch (err) {
        console.error(err);
        throw new Error('Failed to update user avatar');
    }
};


module.exports = { getByEmail, executeEmailChange,executeTransaction, getUserInstance, checkUser, deleteOldAvatar, updateUserAvatar, takeUserProp };