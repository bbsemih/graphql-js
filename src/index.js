import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID


//Type definitions (schema)
const typeDefs = `
    type Query {
        me: Me!
        post: Post!
    }

    type Me {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

//Resolvers
const resolvers = {
    Query: {
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
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log("The server is up on port 4000!");
});