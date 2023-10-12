import { openDB } from 'idb';

const initdb = async () =>
console.log('initializing db')
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Updating Database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({
    id: 1,
    value: content
  });
  const result = await request;
  console.log('Saved data to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Reading database');
  const db = await openDB('jate', 1);
  console.log('opened db')
  const tx = db.transaction('jate', 'readonly');
  console.log('message', tx)
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  result ? console.log('Database content', result.value) : console.log("No Data");
  return result?.value

}

initdb();
