const { buildSchema } = require('graphql');
const configSchema = require('./config.schema');
const postSchema = require('./post.schema');

const schemas = buildSchema(
  ``.concat(
    configSchema,
    postSchema,
    `
    type RootQuery {
      posts: [Post!]!
    }

    type RootMutation {
      createPost(newPost: PostInput): Post
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `
  )
);

module.exports = schemas;
