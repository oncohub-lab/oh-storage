import path from 'path';
import { storage } from 'oncohub-web3-storage';
import schema from '../schema.json';

async function main() {
  const treeObj = new storage.TreeHandler();

  // save new schema to json
  await treeObj.save('tree', path.resolve(__dirname, '../', 'trees'), schema);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
