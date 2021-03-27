/**
 * SponsorPlayRelation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    sponsor: {
      model: 'sponsor'
    },

    play: {
      model: 'play'
    },

    types: {
      collection: 'sponsorplayrelationtype',
      via: 'sponsorplayrelations'
    },

  },

};

