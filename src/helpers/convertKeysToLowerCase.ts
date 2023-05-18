interface ObjType {
  [key: string]: any;
}

export function convertKeysToLowerCase(obj: ObjType): ObjType {
  const keys = Object.keys(obj);
  const newObj: ObjType = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i].charAt(0).toLowerCase() + keys[i].slice(1);
    newObj[key.toLowerCase()] = obj[key];
  }

  return newObj;
}
