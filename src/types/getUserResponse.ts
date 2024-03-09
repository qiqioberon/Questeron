interface ResultMessage {
    en: string;
}

export interface ResponseUser<Data> {
    resultMessage: ResultMessage;
    resultCode: string;
    user: Data;
}

