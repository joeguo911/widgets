class DataCache {
    _cache: Map<string, any>
    constructor(){
        this._cache = new Map()
    }
    setData(slug: string, data: any) {
        this._cache.set(slug, data)
    }
    getDataByslug(slug: string) {
        return this._cache.get(slug)
    }
    has(slug: string) {
        return this._cache.has(slug)
    }
}

const tokenDataCache = new DataCache()

export default tokenDataCache