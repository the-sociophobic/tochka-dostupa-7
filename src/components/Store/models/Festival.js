/**
 * Festival.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    number: {
      type: 'string',
      example: 'VII'
    },

    color: {
      type: 'string',
      example: '#474747'
    },

    name: {
      type: 'string',
      example: 'СЕДЬМОЙ МЕЖДУНАРОДНЫЙ КЛАССНЫЙ ФЕСТ'
    },
    name_eng: {
      type: 'string',
      example: 'SEVENTH INTERNATIONAL COOL FEST'
    },

    specificPlayAttribs: {
      type: 'json',
      example: '{"button_text": "string"}'
    },

    programs: {
      collection: 'festivalplayrelation',
      via: 'festival',      
    },

  },

};

