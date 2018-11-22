import { Request } from "./request";

export interface CreateCourseRequest extends Request {
    title:string
    description:string
    creationDate:Date
    duration:number
}