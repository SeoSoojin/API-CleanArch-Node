import { PostWriter } from "../interfaces/interfaces";
import { Post } from "../models/post";

class PostWriterService  { 

    private postWriter: PostWriter

    constructor (postWriter: PostWriter) {

        this.postWriter = postWriter

    }

    insertPost(post: Post): Promise<null | Error> {
        
        return this.postWriter.insertPost(post)
    
    }

    updatePost(id: number, post: Post): Promise<null | Error> {

        if (id <= 0) {
            return new Promise((reject) => {
                reject(new Error("invalid id, should be greater than 0"))
            })
        }
        return this.postWriter.updatePost(id, post)

    }

}

export { PostWriterService }