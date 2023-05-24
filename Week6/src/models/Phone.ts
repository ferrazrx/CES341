import { ObjectId, WithId } from 'mongodb';

export class Phone implements WithId<Phone> {
  constructor(
    public _id: ObjectId | undefined,
    public name: string,
    public phone_number: string,
    public createdAt: Date,
    public updatedAt: Date,
    public owner: ObjectId,
  ) {}
}
