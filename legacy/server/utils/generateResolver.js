'use strict';

function generateResolver(fn) {
  return async (obj, args, context) => {
    return await fn({ obj, args, context, esClient: context.esClient, admin: context.admin });
  }
}

module.exports = generateResolver;
