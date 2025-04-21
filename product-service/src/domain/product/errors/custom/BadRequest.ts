import { GenericErrors } from "../GenericsError";

export class BadRequest extends GenericErrors {
    constructor(message = 'Bad Request') {
        super(message, 404)
    }
}