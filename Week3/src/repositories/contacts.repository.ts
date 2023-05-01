import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { injectable } from 'inversify';
import { Repository } from './repository.interface';
import { Contact } from '../models/contacts';

@injectable()
export class ContactRepository implements Repository<Contact> {
  private client: MongoClient;
  private collection?: Collection<Contact>;

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

    this.init();
  }

  init() {
    this.run()
      .then(() => {
        if (!process.env.MONGO_DB) {
          throw new Error('No database provided for mongoDB repository, please verify mongoDB connection settings.');
        }

        const db = this.client.db(process.env.MONGO_DB);

        if (!process.env.MONGO_DB_COLLECTION) {
          throw new Error('No collection provided for mongoDB repository, please verify mongoDB connection settings.');
        }

        this.collection = db.collection(process.env.MONGO_DB_COLLECTION);
      })
      .catch(console.dir);
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

  async all(): Promise<Contact[]> {
    const cursor = await this.collection?.find({});
    return cursor ? await cursor.toArray() : [];
  }

  async findByID(_id: string): Promise<Contact> {
    const o_id = new ObjectId(_id);
    const cursor = await this.collection?.findOne({ _id: o_id });
    return cursor as Contact;
  }
}
