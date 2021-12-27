import { PostGetter } from "../interfaces/interfaces";
import { Post } from "../models/post";

class PostGetterService  { 

    private postGetter: PostGetter

    constructor (postGetter: PostGetter) {

        this.postGetter = postGetter

    }

    getPosts(): Promise<Post[] | Error>{

        return this.postGetter.getPosts()

    }

    getPostById(id: number): Promise<Post | Error> {

        if (id <= 0) {
            return new Promise((reject) => {
                reject(new Error("invalid id, should be greater than 0"))
            })
        }

        return this.postGetter.getPostById(id)
    
    }

}

export { PostGetterService }