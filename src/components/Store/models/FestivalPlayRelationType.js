/**
 * FestivalPlayRelationType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      example: 'Свободная программа'
    },
    name_eng: {
      type: 'string',
      example: 'Open call'
    },

    festivalplayrelations: {
      collection: 'festivalplayrelation',
      via: 'types',
    },
    
  },

};

