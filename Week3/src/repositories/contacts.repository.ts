import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { injectable } from 'inversify';
import { Acknowledge, Repository } from './repository.interface';
import { Contact } from '../models/contacts';

@injectable()
export class ContactRepository implements Repository<Contact> {
  private client: MongoClient;

  constructor() {
    if (!process.env.MONGO_DB_ACCESS_POINT) {
      throw new Error('No connection string provide for MongoDB, please verify mongoDB connection settings.');
    }

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(process.env.MONGO_DB_ACCESS_POINT, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.run();
  }

  async run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db(process.env.MONGO_DB).command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (e) {
      console.error(e);
      throw new Error('MongoDB Connection Failed!');
    }
  }

  collection(): Collection<Contact> {
    if (!process.env.MONGO_DB) {
      throw new Error('No database provided for mongoDB repository, please verify mongoDB connection settings.');
    }

    const db = this.client.db(process.env.MONGO_DB);

    if (!process.env.MONGO_DB_COLLECTION) {
      throw new Error('No collection provided for mongoDB repository, please verify mongoDB connection settings.');
    }

    return db.collection(process.env.MONGO_DB_COLLECTION);
  }

  async all(): Promise<Contact[]> {
    try {
      const cursor = await this.collection().find({});
      if (!cursor) {
        throw new Error('Cursor was not retrieved correctly.');
      }
      return await cursor.toArray();
    } catch (e) {
      throw new Error('Error, could not retrieve all contacts! - ' + (e as Error).message);
    }
  }

  async findByID(_id: string): Promise<Contact> {
    try {
      const o_id = new ObjectId(_id);
      const cursor = await this.collection().findOne({ _id: o_id });
      if (!cursor) {
        throw new Error('Cursor was not retrieved correctly.');
      }
      return cursor as Contact;
    } catch (e) {
      throw new Error('Error, could not retrieve the contact! - ' + (e as Error).message);
    }
  }

  async createOne(data: Contact): Promise<Contact> {
    try {
      const result = await this.collection().insertOne(data);
      if (result.acknowledged && result.insertedId) {
        return await this.findByID(result.insertedId.toString());
      }
      throw new Error('Database not acknowledged.');
    } catch (e) {
      throw new Error('Error, could not create a new contact! - ' + (e as Error).message);
    }
  }

  async updateOne(_id: string, data: Contact): Promise<Contact> {
    try {
      const result = await this.collection().findOneAndUpdate(
        {
          _id: new ObjectId(_id),
        },
        {
          $set: { ...data },
        },
        { returnDocument: 'after' },
      );
      if (result && result.ok && result.value) {
        return result.value as Contact;
      }
      throw new Error('Database not acknowledged.');
    } catch (e) {
      throw new Error('Error, could not update the contact! - ' + (e as Error).message);
    }
  }

  async deleteOne(_id: string): Promise<Acknowledge> {
    try {
      const result = await this.collection().deleteOne({
        _id: new ObjectId(_id),
      });
      if (result && result.acknowledged && result.deletedCount > 0) {
        return {
          acknowledged: result.acknowledged,
          count: result.deletedCount,
        };
      } else if (result && !result.acknowledged) {
        throw new Error('Database not acknowledged.');
      }
      throw new Error('Please verify the contact id.');
    } catch (e) {
      throw new Error('Error, could not delete the contact! - ' + (e as Error).message);
    }
  }
}
