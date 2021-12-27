import { errNotFound } from "../../domain/models/errors";
import { Post } from "../../domain/models/post"

class PostgresPostDeleter {

    private pool: { connect: () => any; }
    constructor(user: string, host: string, database: string, password: string, port: number) {

        const { Pool } = require('pg');
        const stringConnection = `postgres://${user}:${password}@${host}:${port}/${database}`
        const pool = new Pool({
            connectionString: stringConnection
        })
        this.pool = pool
    }

    deletePost(id: number): Promise<null | Error> {

        return new Promise((resolve, reject) => {
            
            this.pool.connect().then(async (client: any) => {

                const sql = 'DELETE from posts where id = $1;';
                client.query(sql, [id]).then((res: any) => {

                   if (res.rowCount === 0) {

                        reject(errNotFound)

                    }else{

                        resolve(null)
                    }
                    
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

export { PostgresPostDeleter }