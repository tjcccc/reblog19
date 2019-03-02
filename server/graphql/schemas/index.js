const { buildSchema } = require('graphql');
const { configSchema, configQuery, configMutation } = require('./config.schema');
const { postSchema, postQuery, postMutation } = require('./post.schema');

const schemas = buildSchema(
  ``.concat(
    configSchema,
    postSchema,
    `
    type RootQuery {
      ${configQuery},
      ${postQuery}
    }

    type RootMutation {
      ${configMutation},
      ${postMutation}
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `
  )
);

module.exports = schemas;
