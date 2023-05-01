import { Contact } from '../models/contacts';

export type Acknowledge = {
  acknowledged: boolean;
  count: number;
};
export interface Repository<T> {
  /**
   * Perform all operations to connect with the repository;
   */
  run(): void;

  /**
   * Return all documents in the collection;
   */
  all(): Promise<T[]>;

  /**
   * Return one documents by its ID;
   */
  findByID(_id: string): Promise<T>;

  /**
   * Return the document created;
   */
  createOne(data: Contact): Promise<Contact>;

  /**
   * Return all documents created;
   */
  createMany?(data: Contact[]): Promise<Contact>;

  /**
   * Return document updated;
   */
  updateOne(id: string, data: Contact): Promise<Contact>;

  /**
   * Return all documents created;
   */
  deleteOne(id: string): Promise<Acknowledge>;
}
