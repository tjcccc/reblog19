module.exports.postSchema = `
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
}`;

module.exports.postQuery = `posts: [Post!]!`;
module.exports.postMutation = `
  createPost(newPost: PostInput): Post,
  updateTitle(_id: ID!, title: String!): Post
`
