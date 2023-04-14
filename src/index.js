import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID

//Type definitions (schema)
const typeDefs = `
    type Query {
        add(numbers:[Float!]):Float!   
        greeting(name: String,position:String):String!
        grades:[Int!]!
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
        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0;
            }
            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            })
        },
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello, ${args.name}! You are my favorite ${args.position}`;
            } else {
                return "Hello!";
            }
        },
        grades(parent, args, ctx, info) {
            return [99, 80, 93];
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
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log("The server is up on port 4000!");
});