import { VinInfo } from "../types/Vin";

const isValue = (value: null | string, variable: string) => { 
  return Boolean(value) && !variable.includes('Error');
};

export const filterVinResult = (vinResults: VinInfo[]) => {
  const filteredResults = vinResults.filter(result => isValue(result.Value, result.Variable));

  return filteredResults;
};
