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
      example: "самый любимый спонсор",
    },

    name__eng: {
      type: 'string',
      example: "best sponsor",
    },

    sponsorplayrelations: {
      collection: 'sponsorplayrelation',
      via: 'types',
    },
  },

};

