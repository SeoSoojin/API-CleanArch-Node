import { Author } from "./author"

type Post = {

    id?: number,
    title: string
    author: Author
    description: string
    category: string

}

export type { Post }
