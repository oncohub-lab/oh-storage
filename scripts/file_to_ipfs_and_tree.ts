import path from 'path';
import dotenv from 'dotenv';
import { storage } from 'oncohub-web3-storage';

dotenv.config();

async function main() {
  try {
    if (process.argv.length < 4) {
      throw new Error('usage: ts-node file_to_ipfs_and_tree.ts file-path branch-path');
    }
    const filepath = process.argv[2];
    const branch = process.argv[3];

    const filename = filepath.split('/').slice(filepath.split('/').length - 1)[0];
    // @ts-ignore
    const storageHandler = new storage.StorageHandler(process.env.WEB3_STORAGE_API_TOKEN);
    const treeHandler = new storage.TreeHandler();

    // store file on ipfs
    const { cid, size } = await storageHandler.save(filepath);
    console.log(`File added to ipfs, cid: ${cid}, size ${size}`);

    // add new file to tree
    const name = await treeHandler.getLast(path.resolve(__dirname, '../', 'trees'));
    const treeObj = await treeHandler.load(name, path.resolve(__dirname, '../', 'trees'));
    await treeHandler.add(branch, filename, cid, size, treeObj);

    // save updated tree to json with timestamp
    await treeHandler.save('tree', path.resolve(__dirname, '../', 'trees'), treeObj);
  } catch (error) {
    console.error(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
