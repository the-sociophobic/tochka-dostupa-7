/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    siteSession: {
      collection: 'sitesession',
      via: 'user',
    },

    telegramUser: {
      collection: 'telegramuser',
      via: 'user',
    },
    vkUser: {
      collection: 'vkuser',
      via: 'user',
    },
    instUser: {
      collection: 'instuser',
      via: 'user',
    },
    person: {
      collection: 'person',
      via: 'user',
    },
    

    name: {
      type: 'string',
      example: "Lev",
    },

    surname: {
      type: 'string',
      example: "Vasilyev",
    },

    role: {
      type: 'string',
      example: "superadmin",
    },

    locale: {
      type: 'string',
      example: "rus",
    },



    tickets: {
      collection: 'ticket',
      via: 'user',
    },

  },

};

