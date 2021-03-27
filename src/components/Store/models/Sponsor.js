/**
 * Sponsor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      example: "Prohelvetia",
    },
    name_eng: {
      type: 'string',
      example: "Prohelvetia",
    },

    site: {
      type: 'string',
      example: "prohelvetia.ru",
    },

    description: {
      type: 'string',
      example: "Sooooooooo...",
    },
    description_eng: {
      type: 'string',
      example: "Sooooooooo...",
    },

    avatar: {
      type: 'string',
      example: "https://avatar.me",
    },
    avatar_eng: {
      type: 'string',
      example: "https://avatar.me",
    },

    roles: {
      collection: 'sponsorplayrelation',
      via: 'sponsor',
    },

  },

};

