const generateResolver = require('../utils/generateResolver');
const feedResolver = require('./feedResolver');

const resolvers = {
  Query: {
    feed: generateResolver(feedResolver)
  },
  Result: {
    __resolveType(obj, context, info) {
      if (obj.title) {
        return 'Article';
      }
      else if (obj.imageUrl && !obj.title) {
        return 'Image';
      }
      return null;
    }
  }
};

module.exports = resolvers;
