import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID
//Demo user data
const comments = [{
        id: "1",
        text: "This is a comment",
        author: "1",
        post: "1"
    },
    {
        id: "2",
        text: "This is another comment",
        author: "2",
        post: "2"
    },
    {
        id: "3",
        text: "This is a third comment",
        author: "3",
        post: "3"
    },
    {
        id: "4",
        text: "This is a fourth comment",
        author: "1",
        post: "2"
    }
]

const users = [{
        id: "1",
        name: "Andrew",
        email: "email.gmail.com",
        age: 27
    },
    {
        id: "2",
        name: "Sarah",
        email: "email.gmail.com",
    },
    {
        id: "3",
        name: "Mike",
        email: "email.gmail.com",
    }
]

const posts = [{
        id: "1",
        title: "My first post",
        body: "This is my first post",
        published: true,
        author: "1"
    },
    {
        id: "2",
        title: "My second post",
        body: "This is my second post",
        published: false,
        author: "1"
    },
    {
        id: "3",
        title: "My third post",
        body: "This is my third post",
        published: true,
        author: "2"
    }
]

//Type definitions (schema)
const typeDefs = `

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

    type Query {
        comments: [Comment!]!
        posts(query:String): [Post!]!
        users(query:String): [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!   
    }
`;

//Resolvers
const resolvers = {
    Query: {
        comments(parent, args, ctx, info) {
            return comments;
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return titleMatch || bodyMatch;
            })
        },
        me() {
            return {
                id: "123",
                name: "Andrew",
                email: "email.gmail.com",
            }
        },
        post() {
            return {
                id: "123",
                title: "My first post",
                body: "This is my first post",
                published: true
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post == parent.id;
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id;
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post;
            })
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log("The server is up on port 4000!");
});