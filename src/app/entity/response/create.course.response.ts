import { Response } from "./response";
import { Course } from "../course";

export interface CreateCourseResponse extends Response {
    clientCourse: Course
}