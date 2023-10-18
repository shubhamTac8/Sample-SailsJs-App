const sanitizeHtml = require('sanitize-html');

module.exports = {
  friendlyName: 'Update Car by ID',
  description: 'Update a car record by its ID',
  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'The ID of the car to update.',
    },
    make: {
      type: 'string',
      description: 'The updated make of the car.',
      custom: (value) => {
        if (value) {
          return sanitizeHtml(value);
        }
        return value;
      },
    },
    model: {
      type: 'string',
      description: 'The updated model of the car.',
      custom: (value) => {
        if (value) {
          return sanitizeHtml(value);
        }
        return value;
      },
    },
    year: {
      type: 'number',
      min: 1900, 
      max: new Date().getFullYear(), 
      description: 'The updated year of the car.',
    },
    price: {
      type: 'number',
      description: 'The updated price of the car.',
    },
    fuel_type: {
      type: 'string',
      description: 'The updated fuel type of the car.',
      custom: (value) => {
        if (value) {
          return sanitizeHtml(value);
        }
        return value;
      },
    },
    transmission: {
      type: 'string',
      description: 'The updated transmission of the car.',
      custom: (value) => {
        if (value) {
          return sanitizeHtml(value);
        }
        return value;
      },
    }
  },
  exits: {
    success: {
      description: 'Car updated successfully',
    },
    notFound: {
      description: 'The requested car was not found',
      responseType: 'notFound',
    },
    badRequest: {
      description: 'Invalid request data',
      responseType: 'badRequest',
    },
    serverError: {
      description: 'An error occurred while processing the request',
      responseType: 'serverError',
    },
  },
  fn: async function ({ id, ...inputs }, exits) {
    try {
      const car = await Car.findOne({ id });
      if (!car) {
        return exits.notFound({message:'Car not found'});
      }
      const updatedCar = await Car.update({ id }).set(inputs).fetch();
      if (!updatedCar) {
        return exits.badRequest({message:'Invalid request data or no changes made.'});
      }
      return exits.success({ message: 'Car updated successfully', data: updatedCar });
    } catch (error) {
      return exits.serverError({
        message: 'An error occurred while updating the car record',
        error: error.message,
      });
    }
  },
};

