/**
 * VkUser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user: {
      model: 'user'
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

    userId: {
      type: 'string',
      example: "fdhbvpseojv",
    },

    avatar: {
      type: 'string',
      example: "https://avatar.me",
    },

  },

};

