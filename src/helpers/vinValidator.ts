export const vinValidator = (vin: string) => {
  const preValidation = /^([0-9A-HJ-NPR-Z]{9})([A-HJ-NPR-TV-Y1-9])([0-9A-HJ-NPR-Z])([0-9A-HJ-NPR-Z]{2}\d{4})$/i;
  const isValid = preValidation.test(vin);

  return isValid;
};
