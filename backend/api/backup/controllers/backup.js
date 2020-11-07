'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity = await strapi.services.backup.create(ctx.request.body);
    return ctx.created({
      id: entity.id,
    });
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body;

    let entity = await strapi.services.backup.update({ id }, { 
      ...data,
      finished_at: new Date(),
      status: data.status ? data.status : 'finished',
    });
    return {
      id: entity.id,
    };
  },
};
