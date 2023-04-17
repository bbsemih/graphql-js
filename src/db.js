let comments = [{
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

let posts = [{
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

const db = {
    users,
    posts,
    comments
}

export { db as default }