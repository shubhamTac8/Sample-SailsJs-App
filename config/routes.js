/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'POST /api/models/add': 'car/add-car',
    'GET /api/models/get': 'car/get-car',
    'PUT /api/models/update/:id': 'car/update-car',
    'DELETE /api/models/delete/:id': 'car/delete-car',


};
