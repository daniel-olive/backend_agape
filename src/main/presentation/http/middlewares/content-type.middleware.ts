import { HttpErrors } from "../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";


const allowedContentTypes = [
    'application/json',
    'multipart/form-data'
];

const contentTypeMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const contentType = request.headers['content-type'];

    
    if (!contentType || !allowedContentTypes.some(type => contentType.startsWith(type))) {
        return next(new HttpErrors.UnsupportedMediaTypeError());
    }

    next();
}

export { contentTypeMiddleware as contentType };
