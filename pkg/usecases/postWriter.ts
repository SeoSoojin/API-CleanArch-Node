import { Post } from "../domain/models/post"
import { PostWriterService } from "../domain/services/postWriter"
import { PostWriter } from "./interfaces"

// UC for writing on DB
class UCPostWriter implements PostWriter { 

    private postWriterService: PostWriterService

    constructor(postWriterService: PostWriterService){

        this.postWriterService = postWriterService

    }

    insertPost = (post: Post) => {

        return this.postWriterService.insertPost(post)

    }

    updatePost = (id: number, post: Post) => {

        return this.postWriterService.updatePost(id, post)

    }


}

export { UCPostWriter }