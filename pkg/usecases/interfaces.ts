import { Post } from '../domain/models/post'

interface PostGetter {

    getPosts:  () => Promise<Post[] | Error>
    getPostById: (id: number) => Promise<Post | Error>

}

interface PostWriter {

    insertPost: (post: Post) => Promise<null | Error>
    updatePost: (id: number, post: Post) => Promise<null | Error>

}

interface PostDeleter {

    deletePost: (id: number) => Promise<null | Error>

}

export { PostGetter, PostWriter, PostDeleter }