import { Post } from "../../domain/models/post"

class PostgresPostWriter {

    private pool: { connect: () => any; }
    constructor(user: string, host: string, database: string, password: string, port: number) {

        const { Pool } = require('pg');
        const stringConnection = `postgres://${user}:${password}@${host}:${port}/${database}`
        const pool = new Pool({
            connectionString: stringConnection
        })
        this.pool = pool
    }

    async insertPost(post: Post): Promise<null | Error> {

        return new Promise((resolve, reject) => {
            
            this.pool.connect().then(async (client: any) => {

                
            const sql = 'INSERT INTO posts(author_id, title, description, category) VALUES ($1, $2, $3, $4);';
            const values = [post.author.id, post.title, post.description, post.category];
            await client.query(sql, values)
            client.release()
            resolve(null)
            }).catch((err: Error) => {

                reject(err)

            })

        })
        

    }

    async updatePost(id: number, post: Post): Promise<null | Error> {

        return new Promise((resolve, reject) => {
            
            this.pool.connect().then(async (client: any) => {

                const sql = 'UPDATE posts SET title = $1, description = $2, category = $3, author_id = $4 WHERE id = $5;';
                const values = [post.title, post.description, post.category, post.author.id, id];
                await client.query(sql, values)
                client.release()
                resolve(null)
            }).catch((err: Error) => {

                reject(err)

            })

        })

    }   

}

export { PostgresPostWriter }