import { PostWriter } from "../interfaces/interfaces";
import { errEmptyAuthor, errEmptyField, errInvalidAuthorId, errInvalidId } from "../models/errors";
import { Post } from "../models/post";

class PostWriterService  { 

    private postWriter: PostWriter

    constructor (postWriter: PostWriter) {

        this.postWriter = postWriter

    }

    // Checks if every required field is inputted
    insertPost(post: Post): Promise<null | Error> {
        
        if (!post.author) {

            return new Promise((resolve, reject) => {
                reject(errEmptyAuthor)
            })

        }

        if (!post.author.id || post.author.id <= 0) {

            return new Promise((resolve, reject) => {
                reject(errInvalidAuthorId)
            })

        }

        if (!post.title || post.title.length === 0) {

            return new Promise((resolve, reject) => {
                reject(errEmptyField)
            })

        }

        if (!post.description || post.description.length === 0) {

            return new Promise((resolve, reject) => {
                reject(errEmptyField)
            })

        }

        if (!post.category || post.category.length === 0) {

            return new Promise((resolve, reject) => {
                reject(errEmptyField)
            })

        }
        
        return this.postWriter.insertPost(post)
    
    }

    // Checks if the id is valid
    // Checks if every field is inputted
    updatePost(id: number, post: Post): Promise<null | Error> {

        if (id <= 0) {
            return new Promise((resolve, reject) => {
                reject(new Error("invalid id, should be greater than 0"))
            })
        }

        if (!post.author) {

            return new Promise((resolve, reject) => {
                reject(errEmptyAuthor)
            })

        }

        if (!post.author.id || post.author.id <= 0) {

            return new Promise((resolve, reject) => {
                reject(errInvalidAuthorId)
            })

        }

        if (!post.title || post.title.length === 0) {

            return new Promise((resolve, reject) => {
                reject(errEmptyField)
            })

        }

        if (!post.description || post.description.length === 0) {

            return new Promise((resolve, reject) => {
                reject(errEmptyField)
            })

        }

        if (!post.category || post.category.length === 0) {

            return new Promise((resolve, reject) => {
                reject(errEmptyField)
            })

        }

        return this.postWriter.updatePost(id, post)

    }

}

export { PostWriterService }