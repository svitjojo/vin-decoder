export interface ResponseFromServer<T> {
  count: number,
  message: string,
  results: T[],
  searchCriteria: string
};
