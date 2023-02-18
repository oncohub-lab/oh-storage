import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { storage } from 'oncohub-web3-storage';

dotenv.config();

const app = express();
const port = process.env.PORT;

const treeHandler = new storage.TreeHandler();

app.get('/api/v1/tree', async (req: Request, res: Response) => {
  const name = await treeHandler.getLast(__dirname + '/trees');
  const treeObj = await treeHandler.load(name, __dirname + '/trees');
  res.status(200).json(treeObj);
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('<h1>not found</h1>');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
