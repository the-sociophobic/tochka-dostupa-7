/**
 * Person.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      example: "Lev",
    },

    surname: {
      type: 'string',
      example: "Vasilyev",
    },

    name_eng: {
      type: 'string',
      example: "Lev",
    },

    surname_eng: {
      type: 'string',
      example: "Vasilyev",
    },

    roles: {
      collection: 'personplayrelation',
      via: 'person',
    },


    
    username: {
      type: 'string',
      example: "the_sociophobic",
    },



    user: {
      collection: 'user',
      via: 'person'
    }

  },

};

