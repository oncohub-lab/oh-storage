import path from 'path';
import * as fs from 'fs';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { storage } from 'oncohub-web3-storage';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT;

const treeHandler = new storage.TreeHandler();
// @ts-ignore
const storageHandler = new storage.StorageHandler(process.env.WEB3_STORAGE_API_TOKEN);

app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
  }),
);

app.get('/api/v1/tree', async (req: Request, res: Response) => {
  const name = await treeHandler.getLast(__dirname + '/trees');
  const treeObj = await treeHandler.load(name, __dirname + '/trees');
  res.status(200).json(treeObj);
});

app.get('/api/v1/:cid', async (req: Request, res: Response) => {
  const { cid } = req.params;
  const name: string = <string>req.query.name;
  const endpoint = `https://${cid}.ipfs.w3s.link/${name}`;
  try {
    console.log(`fetching file from ${endpoint}...`);

    const response = await fetch(endpoint);

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    fs.writeFile(name, buffer, () => console.log('file saved.'));
    const filePath = path.resolve(__dirname, name);
    res.download(filePath);

    // // get file with given cid from ipfs
    // const files = await storageHandler.load(CID);
    // console.log('done');
    // console.log(files);
  } catch (err) {
    console.error(err);
  }
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('<h1>not found</h1>');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
