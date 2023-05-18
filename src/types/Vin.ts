export interface VinInfo {
  Value: string | null,
  ValueId: string | null,
  Variable: string,
  VariableId: number
};

export interface VinResponse {
  Count: number,
  Message: string,
  Results: VinInfo[],
  SearchCriteria: string
};
