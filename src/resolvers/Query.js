const Query = {
    comments(parent, args, { db }, info) {
        return db.comments;
    },
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users;
        }
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts;
        }
        return db.posts.filter((post) => {
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
}

export { Query as default };