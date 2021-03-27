/**
 * TelegramUser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user: {
      model: 'user'
    },

    userId: {
      type: 'string',
      example: "fdhbvpseojv",
    },

    name: {
      type: 'string',
      example: "Lev",
    },

    surname: {
      type: 'string',
      example: "Vasilyev",
    },

    username: {
      type: 'string',
      example: "the_sociophobic",
    },

    avatar: {
      type: 'string',
      example: "https://avatar.me",
    },

  },

};

