const jwt = require('jsonwebtoken');

const verifyResetToken = (req,  res, next) => {
    let token = req.headers.authorization;
    const verifier = process.env.JWT_KEY_RESET
    if (!token) {
        return res.status(401).send('no token')
    };

    try{
        token = token.split(' ')[1];

        if (token === 'null' || !token) {
            return res.status(401).send('denied')
        };

        let verifiedUser = jwt.verify(token, verifier );
        if (!verifiedUser) {
            return res.status(401).send('illegal unverified')
        }
        req.user = verifiedUser;

        next();
    }
    catch(err){
        return res.status(400).send('invalid token')
    };
};

const checkRole = async (req,res,next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).send('illegal user role')
}

module.exports = verifyResetToken;