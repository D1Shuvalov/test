export interface IUsage {
  type: string;
  model: string;
  created_at: string;
  usage_input: number;
  usage_output: number;
}

export interface ICost {
  model: string;
  input: number;
  output: number;
}
