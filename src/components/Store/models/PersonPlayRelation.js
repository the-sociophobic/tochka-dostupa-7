/**
 * PersonPlayRelation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    person: {
      model: 'person',
    },

    play: {
      model: 'play',
    },

    types: {
      collection: 'personplayrelationtype',
      via: 'personplayrelations',
    },

  },

};

