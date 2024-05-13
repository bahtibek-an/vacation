import { AxiosError } from "axios";

interface ApiResponse {
    status?: {msg: string}[];
    message: string;
}

function parseApiError(error: AxiosError): string[] {
    const result: string[] = [];
    const responseData = error.response?.data as ApiResponse;
    result.push(responseData.message);
    responseData?.status?.map((item) => {
        result.push(`${item.msg}`);
    });
    return result;
}

export default parseApiError;