import { Post } from '../domain/models/post'

// Interface for PostGetter
interface PostGetter {

    // Gets all posts, returns a promise of an array of posts or an error
    getPosts:  () => Promise<Post[] | Error>

    // Gets a post by the given Id, returns a promise of a post or an error
    getPostById: (id: number) => Promise<Post | Error>

}

// Interface for Writer
interface PostWriter {

    // Inserts a post, returns a promise of null or an error
    insertPost: (post: Post) => Promise<null | Error>

    // Updates a post, returns a promise of null or an error
    updatePost: (id: number, post: Post) => Promise<null | Error>

}

// Interface for PostDeleter
interface PostDeleter {

    // Deletes a post, returns a promise of null or an error
    deletePost: (id: number) => Promise<null | Error>

}

export { PostGetter, PostWriter, PostDeleter }