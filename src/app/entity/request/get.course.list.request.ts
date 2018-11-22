import { Request } from "./request";

export interface GetCourseListRequest extends Request {
    limit?: number
    offset?: number
}