import { Post } from "../domain/models/post"
import { PostDeleterService } from "../domain/services/postDeleter"
import { PostDeleter } from "./interfaces"

class UCPostDeleter implements PostDeleter { 

    private postDeleterService: PostDeleterService

    constructor(postDeleterService: PostDeleterService){

        this.postDeleterService = postDeleterService

    }

    deletePost = (id: number) => {

        return this.postDeleterService.deletePost(id)

    }


}

export { UCPostDeleter }