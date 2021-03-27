/**
 * Show.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    date_day: {
      type: 'string',
      required: true,
      example: "16.07.2019",
    },
    act_time: {
      type: 'string',
      required: true,
      example: "16:00",
    },
    ticket_id: {
      type: 'string',
      example: "12236",
    },
    widget_id: {
      type: 'string',
      example: "12236",
    },
    noTickets: {
      type: 'boolean',
      required: true,
      example: false,
    },
    special_link: {
      type: 'string',
      example: "https://kiss-graph.com",
    },
    play: {
      model: "play",
    },
  },

};

