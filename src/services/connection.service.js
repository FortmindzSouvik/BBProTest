const httpStatus = require('http-status');
const { User,Connection } = require('../models');
const ApiError = require('../utils/ApiError');

const addConnectionData =async (data) => {
    const connection = await new Connection(data).save();
    if (!connection) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to add connection');
    }
   
    return connection;
  };
  const getConnectionData =async (data) => {
    const connection = await Connection.findOne(data);
    
    return connection;
  };
  const connectionData =async (data, page, limit, skip) => {
    const connection = await Connection.find(data).populate("user_id coach_id").skip(skip)  // Skip meals based on the current page
    .limit(limit) // Limit the number of meals to return
    .exec();
    
    return connection;
  };
  const inviteData =async (data) => {
    const connection = await Connection.findOne(data).populate("user_id")
    
    return connection;
  };
  const getCountByUserId = async (schema,data) => {
    // Ensure schema is valid
 if (!schema || typeof schema.countDocuments !== 'function') {
   throw new Error('Invalid schema provided');
 }
   const count = await schema.countDocuments(data)
   if (count===0) {
     throw new ApiError(httpStatus.NOT_FOUND, 'Failed to get count');
   }
  
   return count;
 };
 const updateConnectionStatus =async (id,data) => {
  const connection = await Connection.updateOne(id,data);
  
  return connection;
};
const deleteConnection =async (id) => {
  const connection = await Connection.deleteOne(id);
  
  return connection;
};
module.exports = {
    addConnectionData,
    getConnectionData,
    connectionData,
    getCountByUserId,
    updateConnectionStatus,
    deleteConnection,
    inviteData
}