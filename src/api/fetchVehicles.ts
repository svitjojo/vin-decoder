const URL = 'https://vpic.nhtsa.dot.gov/api';

export const loadDecodedVin = async(vin: string) => {
  try {
    const response = await fetch(URL + `/vehicles/DecodeVin/${vin}?format=json`);

    if (response.status === 404) {
      throw Error('');
    }

    const data = response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
  }  
};

export const getVariablesList = async () => {
  const response = await fetch(URL + '/vehicles/GetVehicleVariableList?format=json');
  const data = response.json();

  return data;
};
