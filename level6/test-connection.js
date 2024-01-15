const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://kolong4310:1sQbSQY3L8aeOfpz@cluster0.z3ril43.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const adminDB = client.db('admin').admin();
  const listDatabases = await adminDB.listDatabases();
  console.log(listDatabases);
  return "OK";
}

run()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());