const {deleteOldAvatar, updateUserAvatar, getByEmail, executeTransaction, checkUser, executeEmailChange, getUserInstance} = require('../cCommonServices/cCommonServices');
const {sendPropertiesChange, sendVerification} = require('../../email/emailservice');
const {generateVerifToken, generateResetToken, hashUserPassword } = require('../auth/register');
const {validatePassword, findUser} = require('../auth/login')


const ProfileController = {
    changeUsername : async (req, res) => {
        try {
        const {username} = req.body;

        const getUser = await checkUser(req, 'username', username)

        await executeTransaction(getUser.id, 'username', username);

        await sendPropertiesChange(getUser.email, getUser.username, 'username', username);

        return res.status(200).json({message: 'success', data: username })
     }
        catch (err) {
        return res.status(500).json({message: 'name has been used'})
     }
    },
    changePhone : async (req, res) => {
        try{
            const {phone} = req.body;
    
            const getUser = await checkUser(req, 'phone', phone);
    
            await executeTransaction(getUser.id,'phone', phone);

            await sendPropertiesChange(getUser.email, getUser.username, 'phone', phone);
    
            return res.status(200).json({message: 'success', data: phone})
        }
        catch (err) {
            return res.status(500).json({message: 'no', error: err.message})
        }
    },

    changeEmail: async (req, res) => {
        try{
        const { email } = req.body;

        const getUser = await checkUser(req);

        const payload = { id: getUser.id,};
    
        const token = await generateVerifToken(payload);

        await executeEmailChange(getUser.id,'email', email);

        const getUserNew = await checkUser(req)

        await sendVerification(getUserNew.email, getUserNew.username, 'change email' ,token);
        
        return res.status(200).json({message: 'email change succeed'})
        }
        catch (err) {
            return res.status(500).json({message: 'email change failed', error: err.message})
        }
    },

    changeAvatar : async (req, res) => {
        try {
            const userInstance = await getUserInstance(req);
    
            if (!userInstance) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (userInstance.imgProfile) {
             deleteOldAvatar(userInstance.imgProfile);
            }
    
            await updateUserAvatar(userInstance.id, req.file.path);
            
            return res.status(200).json({ message: 'avatar change succeed' });

        } catch (err) {
            return res.status(500).json({ message: 'avatar change failed', error: err.message });
        }
    },
    
    changePassword: async (req,res) => {
        try {
            const {oldPassword, newPassword, confirmNewPassword} = req.body;
            const {id} = req.user;
            const checkPassword = await findUser(id);
            const comparePassword = await validatePassword(oldPassword, checkPassword.password)
            if(!comparePassword) return res.status(400).json({message: 'wrong old password'})
            if(newPassword !== confirmNewPassword) return res.status(400).json({message: 'password mismatched'})
            const hashedPass = await hashUserPassword(newPassword);
            await executeTransaction(id, 'password', hashedPass)
          
            return res.status(200).json({message: 'changing password ok'})
        }
        catch (err) {
            return res.status(500).json({message: 'changing password not ok', error: err.message})
        }
    },

    forgetPassword: async (req, res) => {
        try {
        const {email} = req.body;
        const idEmail = await getByEmail(email);

        if(!idEmail) {
            return res.status(404).json({message: 'unregistered email'})
        };

        const payload = {id: idEmail.id};

        const token = await generateResetToken(payload)

        await sendVerification(email, idEmail.username, 'reset password', token)
        
        return res.status(200).json({message: 'check email to continue changing your password'})
    }
    catch (err) {
        return res.status(500).json({message: 'please try again next life', error: err.message})
    }
    }, 

    resetPassword: async (req, res) => {
       try {
        const {newPassword} = req.body;
            const {id} = req.user;
            const hashedPass = await hashUserPassword(newPassword);

            await executeTransaction(id, 'password', hashedPass)
          
            return res.status(200).json({message: 'resetting password ok'})
         
       }
       catch (err) {
        return res.status(500).json({message: 'resetting password not ok', error: err.message})
       }
    }

}

module.exports = ProfileController;