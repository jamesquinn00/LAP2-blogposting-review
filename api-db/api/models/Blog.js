const db = require ('../dbConfig')

class Blog {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.content = data.content
        this.name = data.name
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try{
                const blogsData = await db.query(`SELECT * FROM posts;`)
                const blogs = blogsData.rows.map(d => new Blog(d))
                resolve(blogs);
            }
            catch(err){
                reject("Error retrieving blog list");
            }
        }) 
    };
 
    static findById(id){
        return new Promise (async (resolve, reject) => {
            try{
                let blogData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [ id ]);
                let blog = new Blog(blogData.rows[0]);
                resolve (blog);
            } catch (err) {
                reject('Blog not found');
            }
    })
    }

    static create(title, content, name){
        return new Promise (async (resolve, reject) => {
            try {
                let blogData = await db.query(`INSERT INTO posts (title, content, name) VALUES ($1, $2, $3) RETURNING *;`, [ title, content, name ]);
                let newBlog = new Blog(blogData.rows[0]);
                resolve (newBlog);
            } catch (err) {
                reject('Error creating blog entry');
            }
        });
    }
}

module.exports = Blog;