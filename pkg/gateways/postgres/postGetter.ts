import { Post } from "../../domain/models/post";
import { errNotFound } from "../../domain/models/errors";

class PostgresPostGetter {
    
    private pool: { connect: () => any; }
    constructor(user: string, host: string, database: string, password: string, port: number) {

        const { Pool } = require('pg');
        const stringConnection = `postgres://${user}:${password}@${host}:${port}/${database}`
        const pool = new Pool({
            connectionString: stringConnection
        })
        this.pool = pool

    }

    getPosts(): Promise<Post[] | Error> {

        return new Promise((resolve, reject) => {

            this.pool.connect().then((client: any) => {

                const sql = `SELECT p.id, p.title, p.description, p.category, a.name FROM posts as p
                             JOIN authors as a ON p.author_id = a.id;`;
                client.query(sql).then((res: any) => {

                    client.release()
                    const posts: Post[] = []

                    if (res.rowCount === 0) {

                        reject(errNotFound)
                        
                    }
                    res.rows.map((post: any) => {

                        const newPost: Post = {
                            id: post.id,
                            title: post.title,
                            category: post.category,
                            description: post.description,
                            author: {
                                name: post.name
                            }
                        }
                        posts.push(newPost)
                    })

                    resolve(posts)

                }).catch((err: Error) => {

                    client.release()
                    reject(err)

                })

            }).catch((err: Error) => {

                reject(err)

            })

        })

    }

    getPostById(id: number): Promise<Post | Error> {

        return new Promise((resolve, reject) => {

            this.pool.connect().then((client: any) => {

                const sql = `SELECT p.id, p.title, p.description, p.category, a.name FROM posts as p 
                             JOIN authors as a ON p.author_id = a.id where p.id = $1;`;
                client.query(sql, [id]).then((res: any) => {

                    if (res.rowCount === 0) {
                        reject(errNotFound)
                    }
                    const post: Post = {
                        id: res.rows[0].id,
                        title: res.rows[0].title,
                        category: res.rows[0].category,
                        description: res.rows[0].description,
                        author: {
                            name: res.rows[0].name
                        }
                    }

                    resolve(post)

                }).catch((err: Error) => {

                    reject(err)

                })
                client.release()

            }).catch((err: Error) => {

                reject(err)

            })

        })

    }
}

export { PostgresPostGetter }