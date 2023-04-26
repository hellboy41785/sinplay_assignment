import fsPromises from 'fs/promises';
import path from 'path'
import { IProducts } from '../../types/products';

export async function getLocalData() {
  const filePath = path.join(process.cwd(), 'json/data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString());

  return objectData
}

export async function updateLocalData({ id,title,description,thumbnail}: IProducts) {
  const filePath = path.join(process.cwd(), 'json/data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString());
  const newData = {
    id,
    title,
    description,
    thumbnail,
  };
  objectData.unshift(newData);
  const updatedData = JSON.stringify(objectData);
  await fsPromises.writeFile('json/data.json', updatedData);
  
}