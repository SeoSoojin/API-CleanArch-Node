import { PostGetterService } from "../domain/services/postGetter";
import { PostGetter } from "./interfaces";

class UCPostGetter implements PostGetter { 

    private postGetterService: PostGetterService

    constructor(postGetterService: PostGetterService){

        this.postGetterService = postGetterService

    }

    getPosts = () => {

        return this.postGetterService.getPosts()

    }

    getPostById = (id: number) => {

        return this.postGetterService.getPostById(id)
    
    }

}

export { UCPostGetter }