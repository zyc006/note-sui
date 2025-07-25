export interface GridCell {
  id: string;
  row: number;
  col: number;
  content: string;
  color: string;
  type: string;
  tip: string;
  reward: string;
  // 可添加更多字段
}

export type GridData = GridCell[][];
