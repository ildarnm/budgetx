
export default class Repository<T> {
    cache: T[] = [];

    getFromCache(id: string): T | undefined {
        return this.cache.find((item: any) => item.id === id);
    }
}
