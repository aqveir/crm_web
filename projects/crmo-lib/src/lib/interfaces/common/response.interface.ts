export interface IResponse {
    data: any;
    status: string;
    execution_time: string;
}

export interface IResponseError {
    error: IErrorBody;
}

export interface IErrorBody {
    message: string;
    status_code: number;
    execution_time: string;
}
