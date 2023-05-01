export interface Repository<T> {

    /**
     * Perform all operations to connect with the repository;
     */
    init(): void;

    /**
     * Return all documents in the collection;
     */
    all(): Promise<T[]>;

     /**
     * Return one documents by its ID;
     */
    findByID(_id: string): Promise<T>;
}