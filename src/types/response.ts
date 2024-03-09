interface ResultMessage {
    en: string;
}

export interface ApiResponse<Data> {
    resultMessage: ResultMessage;
    resultCode: string;
    data: Data;
}
