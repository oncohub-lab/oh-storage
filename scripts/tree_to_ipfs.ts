import * as fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { storage } from 'oncohub-web3-storage';

dotenv.config();

async function main() {
  // @ts-ignore
  const storageHandler = new storage.StorageHandler(process.env.WEB3_STORAGE_API_TOKEN);
  const treeHandler = new storage.TreeHandler();

  const name = await treeHandler.getLast(path.resolve(__dirname, '../', 'trees'));
  const { cid, size } = await storageHandler.save(path.resolve(__dirname, '../', 'trees', name));
  console.log(`Tree added to ipfs, cid: ${cid}, size ${size}`);
  await fs.appendFile(
    path.resolve(__dirname, '../', 'cid_tree_registry.txt'),
    `tree cid: ${cid}, tree name: ${name}, size: ${size}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
