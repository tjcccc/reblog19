module.exports.configSchema = `
type Config {
  _id: ID!
  user_id: ID!
  blog_name: String!
  author_name: String!
}`;

module.exports.configQuery = `config: Config`;
module.exports.configMutation = `updateBlogName(blogName: String): Config`;
