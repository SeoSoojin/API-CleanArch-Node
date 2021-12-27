import { PostDeleter } from "../interfaces/interfaces";
import { Post } from "../models/post";

class PostDeleterService  { 

    private postDeleter: PostDeleter

    constructor (postDeleter: PostDeleter) {

        this.postDeleter = postDeleter

    }

    deletePost(id: number): Promise<null | Error> {

        if (id <= 0) {
            return new Promise((reject) => {
                reject(new Error("invalid id, should be greater than 0"))
            })
        }
        return this.postDeleter.deletePost(id)

    }

}

export { PostDeleterService }