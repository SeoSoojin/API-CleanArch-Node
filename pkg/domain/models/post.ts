import { Author } from "./author"

// Type definitions for model Post
type Post = {

    id?: number,
    title: string
    author: Author
    description: string
    category: string

}

export type { Post }
