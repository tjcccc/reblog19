// Express
const express = require('express');
const morgan = require('morgan');
const logger = require('./middlewares/logger');
const bodyParser = require('body-parser');

// Database
const dbConnection = require('./middlewares/db-connection');

// GraphQL
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
// const schema = require('./schema');

// Test
// const uuid = require('uuid/v1');
const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('./entities/post');
const mockPosts = Post.find().limit(10).then(posts => {
  return posts.map(post => {
    return { ...post._doc };
  });
}).catch(error => {
  logger.error(error);
  throw error;
});

const app = express();

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(dbConnection);
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Post {
      _id: ID!
      title: String!
      create_time: String!
      post_time: String!
      update_time: String!
      content: String!
      state: Int!
      categories: [ID]!
      tags: [ID]!
      view_count: Int!
      like_count: Int!
    }

    input PostInput {
      content: String!
      state: Int!
      categories: [ID]!
      tags: [ID]!
    }

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
  `),
  rootValue: {
    posts: () => {
      return mockPosts;
    },
    createPost: (args) => {
      const post = new Post({
        _id: new ObjectId(),
        title: 'New title',
        create_time: new Date().toISOString(),
        post_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
        content: args.newPost.content,
        state: args.newPost.state,
        categories: args.newPost.categories,
        tags: args.newPost.tags,
        view_count: 0,
        like_count: 0
      });
      return post.save()
        .then(result => {
          logger.info(result);
          return { ...result._doc };
        }).catch(error => {
          logger.error(error);
          throw error;
        });
    }
  },
  graphiql: true,
  formatError(error) {
    if (!error.originalError) {
      return error;
    }
    const data = error.originalError.data;
    const message = error.message || 'An error occurred.';
    const code = error.originalError.code || 500;
    return {
      message: message,
      status: code,
      data: data
    };
  }
}));

app.get('/', (req, res) => {
  res.send('<h1>hello, reblog19 server.</h1>');
});

const PORT = process.env.PORT || 4000;

app.listen(4000, () => logger.info(`Server started on port ${PORT}.`));
