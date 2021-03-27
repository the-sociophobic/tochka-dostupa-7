/**
 * FestivalPlayRelation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    festival: {
      model: 'festival'
    },
    
    play: {
      model: 'play'
    },
    
    types: {
      collection: 'festivalplayrelationtype',
      via: 'festivalplayrelations',
    },
    
    specificPlayAttribs: {
      type: 'json',
      example: '{"button_text": "string"}'
    },

  },

};

