import { GenericErrors } from "../GenericsError";

export class NotFoundError extends GenericErrors {
    constructor(message = 'Not Found') {
        super(message, 404)
    }
}