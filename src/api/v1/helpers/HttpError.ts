export default class HttpError extends Error {

    statusCode: number;
    data: object | null;

    constructor(message: string, statusCode?: number, data?: object) {
        super(message)

        this.statusCode = !statusCode ? 500 : statusCode;
        this.data = !data ? null : data;
    }
}