/**
 * PersonPlayRelationType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      example: "режик",
    },

    name__eng: {
      type: 'string',
      example: "director",
    },

    personplayrelations: {
      collection: 'personplayrelation',
      via: 'types',
    },
  },

};

