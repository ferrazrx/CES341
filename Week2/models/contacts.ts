import { ObjectId } from "mongodb";

export class Contact{
    constructor(
        public _id: ObjectId,
        public firstName: string,
        public lastName: string,
        public email: string,
        public favoriteColor: string,
        public birthday: string,
    ){}
}