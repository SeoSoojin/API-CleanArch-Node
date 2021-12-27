import { PostDeleter } from "../interfaces/interfaces";
import { errInvalidId } from "../models/errors";
import { Post } from "../models/post";

class PostDeleterService  { 

    private postDeleter: PostDeleter

    constructor (postDeleter: PostDeleter) {

        this.postDeleter = postDeleter

    }

    // Checks if the id is valid
    deletePost(id: number): Promise<null | Error> {

        if (id <= 0) {
            return new Promise((resolve, reject) => {
                reject(errInvalidId)
            })
        }
        return this.postDeleter.deletePost(id)

    }

}

export { PostDeleterService }