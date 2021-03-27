/**
 * NotToScaleTicket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    number: {
      type: 'string',
      required: true,
      example: "1XZKDBJLVWRUvdopjed", 
    },

    used: {
      type: 'boolean',
      example: true,
    },

    leftUser: {
      type: 'string',
      example: "user0",
    },

    user0: {
      type: 'string',
      example: "id1592552100",
    },
    user1: {
      type: 'string',
      example: "id1592552100",
    },

  },

};

