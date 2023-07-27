const {verifyToken, getUserById, isUserVerified, markUserAsVerified} = require('./verify')
const {checkIfExists, createUserAndSendEmail} = require('./register')
const {buildQuery, findUser, validatePassword, generateToken} = require('./login')

const authController = {
    register : async (req, res) => {
      const { username, email, phone, password } = req.body;

      const isExist = await checkIfExists(email, username, phone);
      console.log(isExist)
      if (isExist) {
          return res.status(400).json({message: 'email, phone number, or username has been used'});
      }
    try {
        console.log(2)
        await createUserAndSendEmail(username, email, password, phone);
        console.log(3)
        return res.status(200).json({message: 'register succeed', data: {username, email, phone}}) ;
    } catch (err) {
        return res.status(500).json({message: 'register failed', error: err.message});
    }
 } ,
 login : async (req, res) => {
    try {
      const { email, password, username, phone } = req.body;
      const query = buildQuery(email, username, phone);
      const checkLogin = await findUser(query);
  
      if (!checkLogin) {
        return res.status(400).json({message: 'user not found'});
      }
  
      const isValid = await validatePassword(password, checkLogin.password);
      if (!isValid) {
        return res.status(401).json({message:"Password is incorrect"});
      }
  
      let payload = { 
        id: checkLogin.id,
        isVerified: checkLogin.isVerified
      };
      const token = generateToken(payload);
  
      return res.status(200).json({message: "Login succeeded", loginToken: token});
    } catch (err) {
      return res.status(500).json({message:"Login failed",error: err.message});
    }},

    verify: async (req ,res) => {
    try {
        const { token } = req.headers;
        const userId = await verifyToken(token);
        const user = await getUserById(userId);

        if (isUserVerified(user)) {
            return res.status(409).json({message:'Token has been used. User is already verified.'});
        }

        await markUserAsVerified(userId);

        return res.status(200).json({message: "Verification succeeded"});
    } catch (err) {
      return res.status(500).json({message:"Verification failed",error: err.message});
    }
    }
};

module.exports = authController;