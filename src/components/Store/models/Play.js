/**
 * Play.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    link: {
      type: 'string',
      required: true,
      example: "farewell",
    },
    act_title: {
      type: 'string',
      required: true,
      example: "Прощай!",
    },
    act_title_en: {
      type: 'string',
      required: true,
      example: "Fare Thee Well!",
    },
    act_programm: {
      type: 'string',
      required: true,
      example: "Основная программа",
    },
    act_price: {
      type: 'number',
      required: true,
      example: 300,
    },
    act_length: {
      type: 'string',
      required: true,
      example: "15 мин.",
    },
    act_length_en: {
      type: 'string',
      required: true,
      example: "15 min.",
    },
    act_age: {
      type: 'string',
      required: true,
      example: "16+",
    },
    button_text: {
      type: 'string',
      defaultsTo: "купить билет",
      example: "выбрать сеанс",
    },
    button_text_en: {
      type: 'string',
      defaultsTo: "buy ticket",
      example: "choose ticket",
    },

    shows: {
      collection: 'show',
      via: 'play'
    },

    sponsors: {
      collection: 'sponsorplayrelation',
      via: 'play',
    },

    festivals: {
      collection: 'festivalplayrelation',
      via: 'play',
    },

    persons: {
      collection: 'personplayrelation',
      via: 'play',
    }

  },
};

