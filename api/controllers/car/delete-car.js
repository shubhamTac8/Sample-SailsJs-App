
module.exports = {
  friendlyName: 'Delete Car by ID',
  description: 'Delete a car record by its ID',
  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'The ID of the car to delete.',
    },
  },
  exits: {
    success: {
      description: 'Car deleted successfully',
    },
    notFound: {
      description: 'The requested car was not found',
      responseType: 'notFound',
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
      await Car.destroyOne({ id });
      return exits.success({ message: 'Car deleted successfully' });
    } catch (error) {
      return exits.serverError({
        message: 'An error occurred while deleting the car record',
        error: error.message,
      });
    }
  },
};
