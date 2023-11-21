import crypto from 'crypto';
import { IProduct } from './type';

// Hashes data and returns a hex string
export const createHash = (data: IProduct | string): string => {
  const convertedData = typeof data === 'object' ? JSON.stringify(data) : data.toString();

  return data != null ? crypto.createHash('sha256').update(convertedData).digest('hex') : '';
};

export const groupObjectsMax2 = (arr: any) => {
  const groupedArrays = [];
  let currentGroup = [];

  for (const obj of arr) {
    if (currentGroup.length < 2) {
      currentGroup.push(obj);
    } else {
      groupedArrays.push(currentGroup.flat());
      currentGroup = [obj];
    }
  }

  if (currentGroup.length > 0) {
    groupedArrays.push(currentGroup.flat());
  }

  return groupedArrays;
};
