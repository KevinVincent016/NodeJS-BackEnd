import {object, string} from "zod";

const commentSchema = object({
    content: string({required_error: "Content is required"}),
    author: string({required_error: "Author is required"})
})

export default commentSchema