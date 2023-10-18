
const sanitizeHtml = require('sanitize-html');

module.exports = {
  friendlyName: 'Add car',
  description: 'Insert a new car record',

  inputs: {
    make: {
      type: 'string',
      required: true,
      custom: function (value) {
        return sanitizeHtml(value);
      }
    },
    model: {
      type: 'string',
      required: true,
      custom: function (value) {
        return sanitizeHtml(value);
      }
    },
    year: {
      type: 'number',
      required: true,
      min: 1900, 
      max: new Date().getFullYear(), 
    },
    price: {
      type: 'number',
      required: true,
    },
    fuel_type: {
      type: 'string',
      required: true,
    },
    transmission: {
      type: 'string',
      required: true,
    },
    created_by: {
      type: 'number',
      required: false, 
      defaultsTo: 1, 
    },
  },

  exits: {
    success: {
      description: 'Car record created successfully.',
    },
    badRequest: {
      description: 'Invalid input data.',
    },
    serverError: {
      description: 'An error occurred while creating the car record.',
    },
  },

  fn: async function (inputs, exits) {
    try { 
      const newCar = await Car.create(inputs).fetch();
      return exits.success({
        message: 'Car record created successfully',
        data: newCar,
      });
    } catch (error) {
      if (error.invalidAttributes) {
        return exits.badRequest({
          message: 'Invalid input data',
          error: error.invalidAttributes,
        });
      } else {
        return exits.serverError({
          message: 'An error occurred while creating the car record',
          error: error.message,
        });
      }
    }
  },
};
