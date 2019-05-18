const { gql } = require('apollo-server');

const schema = gql`
  type Article {
    title: String
    author: String
    description: String
    url: String
    imageUrl: String
    createdAt: String
    content: String
    source: String
  }

  type Image {
    imageUrl: String
  }

  union Result = Article | Image

  type ResultsList {
    total: Int!
    results: [Result]!
  }

  type Query {
    feed: ResultsList!
  }
`;

module.exports = schema;
