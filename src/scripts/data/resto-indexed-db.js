import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestoDB = {
  async getResto(id) {
    const resto = (await dbPromise).get(OBJECT_STORE_NAME, id);
    return resto;
  },

  async getAllRestos() {
    const restos = (await dbPromise).getAll(OBJECT_STORE_NAME);
    return restos;
  },

  async putResto(resto) {
    return (await dbPromise).put(OBJECT_STORE_NAME, resto);
  },

  async deleteResto(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestoDB;
