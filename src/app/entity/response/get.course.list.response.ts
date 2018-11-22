import { Response } from "./response";
import { Course } from "../course";

export interface GetCourseListResponse extends Response{
    clientCourseList: Course[]
}