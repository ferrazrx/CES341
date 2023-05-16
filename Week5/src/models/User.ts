import { ObjectId, WithId } from 'mongodb';

export class User implements WithId<User> {
  constructor(
    public _id: ObjectId | undefined,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
    public thumbnail: string,
    public phones: ObjectId[],
  ) {}
}
