import { AllTasks } from "./Tasks"

export type getUser = {
    "_id": string,
    "email": string,
    "username": string,
    "name": string,
    "type": string,
    "language": "en",
    "photoUrl": string,
    "isVerified": boolean,
    "countryCode": string,
    "tasks": AllTasks[],
    "createdAt": string,
    "updatedAt": string,
    "__v": string
}