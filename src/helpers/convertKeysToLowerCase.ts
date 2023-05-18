/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseFromServer } from "../types/ResponseFromServer";

function convertKeysToLowerCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToLowerCase);
  }

  const convertedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const convertedKey = key.charAt(0).toLowerCase() + key.slice(1);
      convertedObj[convertedKey] = convertKeysToLowerCase(obj[key]);
    }
  }

  return convertedObj;
}

export function convertResponseKeysToLowerCase<T>(response: ResponseFromServer<T>): ResponseFromServer<T> {
  return convertKeysToLowerCase(response) as ResponseFromServer<T>;
}
