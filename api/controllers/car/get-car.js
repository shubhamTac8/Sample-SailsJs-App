
module.exports = {
  friendlyName: 'Get all cars',
  description: 'Retrieve a list of all cars',
  inputs: {},
  exits: {
    success: {
      description: 'List of cars retrieved successfully',
    },
    serverError: {
      description: 'An error occurred while processing the request',
      responseType: 'serverError',
    },
  },
  fn: async function (inputs, exits) {
    try {
      const cars = await Car.find();
      return exits.success({ message:"List of cars retrieved successfully",data:cars });
    } catch (error) {
      return exits.serverError({
        message: 'An error occurred while fetching the car record',
        error: error.message,
      });
    }
  },
};
