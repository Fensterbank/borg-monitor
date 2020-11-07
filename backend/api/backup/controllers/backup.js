'use strict';
const atob = require('atob');
const { startsWith } = require('lodash');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity = await strapi.services.backup.create(ctx.request.body);
    return ctx.created(entity.id);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body;

    // The last 20 lines of the log file are coming base64 encoded
    // We have to decode them and extract the content we want to save
    const stats = atob(data.stats);
    const lines = stats.split('\n');

    const statsLines = [];
    let collect = false;
    lines.forEach((line) => {
      if (startsWith(line, 'Archive name:'))
        collect = true;
      else if (collect && startsWith(line, '###################'))
        collect = false;
      if (collect)
        statsLines.push(line);
    });

    let entity = await strapi.services.backup.update({ id }, { 
      stats: statsLines.length > 0 ? statsLines.join('\n') : lines.join('\n'),
      finished_at: new Date(),
      status: statsLines.length > 0 ? 'finished' : 'failed',
    });
    return entity.id;
  },
};
