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
  findByID(_id: string): Promise<T | null>;

  /**
   * Return the document created;
   */
  createOne(data: T): Promise<T | null>;

  /**
   * Return all documents created;
   */
  createMany?(data: T[]): Promise<T[]>;

  /**
   * Return document updated;
   */
  updateOne(id: string, data: T): Promise<T | null>;

  /**
   * Return all documents created;
   */
  deleteOne(id: string): Promise<Acknowledge>;
}
