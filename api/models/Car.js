/**
 * Car.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'models',
  attributes: {
    make: { type: 'string', required: true, maxLength: 50 },
    model: { type: 'string', required: true, maxLength: 50 },
    year: { type: 'number', required: true , min: 1900,  max: new Date().getFullYear() },
    price: { type: 'number', required: true, columnType: 'decimal(10,2)' },
    fuel_type: { type: 'string', required: true, maxLength: 20 },
    transmission: { type: 'string', required: true, maxLength: 20 },
    created_by: { type: 'number', required: false, defaultsTo: 1},
  },
};

