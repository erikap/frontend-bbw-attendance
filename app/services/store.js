import Store from 'ember-data/store';

export default class ExtendedStoreService extends Store {
  /*
   * Executes regulare "query"-method. Queries for only one result and returns that if any.
   */
  async queryOne(modelName, query, options) {
    query = query || {}; // eslint-disable-line no-param-reassign
    if (!(query['page[size]'] || (query.page && query.page.size))) {
      query['page[size]'] = 1;
    }
    const results = await this.query(modelName, query, options);
    return results[0];
  }

  async count(modelName, query, options) {
    query = query || {}; // eslint-disable-line no-param-reassign
    if (!(query['page[size]'] || (query.page && query.page.size))) {
      query['page[size]'] = 1;
    }
    const results = await this.query(modelName, query, options);
    const count = results.meta.count;
    return count;
  }

  findRecordByUri(modelName, uri) {
    const cachedRecord = this.peekAll(modelName).find((r) => r.uri == uri);
    if (cachedRecord) {
      return cachedRecord;
    }
    return this.queryOne(modelName, {
      'filter[:uri:]': uri,
    });
  }
}
