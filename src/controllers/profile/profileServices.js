const { resSuccess, resError, resNoChange } = require('../cCommonServices/message');
const {getUserInstance, executeTransaction, } = require('../cCommonServices/cCommonServices')

const changeProperty = async (req, res, propertyName, newPropertyValue) => {
  try {
    const userId = await getUserInstance(req);
    
    if (!userId) {
      res.status(400).json({message: 'user not found', error: err.message});
    }

    if (userId[propertyName] === newPropertyValue) {
      res.status(400).json({message: `${propertyName} unchanged`, error: err.message})
    }

    const updateResult = `${propertyName} updated successfully.`; // Define a success message

    // Pass userId as an argument to the inner callback function
    await executeTransaction(propertyName, newPropertyValue, userId); // Pass userId as an argument here

    const updateduserId = await getUserInstance(req);


      return resSuccess(res, updateResult, updateduserId);
  } catch (err) {
      return res.status(500).json({message: `changing ${propertyName} failed`, error: err.message});
  }
};


module.exports = changeProperty;

