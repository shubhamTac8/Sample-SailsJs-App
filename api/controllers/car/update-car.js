
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
    },
    model: {
      type: 'string',
      description: 'The updated model of the car.',
    },
    year: {
      type: 'number',
      description: 'The updated year of the car.',
    },
    price: {
      type: 'number',
      description: 'The updated price of the car.',
    },
    fuel_type: {
      type: 'string',
      description: 'The updated fuel type of the car.',
    },
    transmission: {
      type: 'string',
      description: 'The updated transmission of the car.',
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
  fn: async function (inputs, exits) {
    try {
      const { id } = inputs;
      const car = await Car.findOne({ id });
      if (!car) {
        return exits.notFound({message:'Car not found'});
      }
      const updatedCar = await Car.updateOne({ id }).set({ ...inputs });
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
