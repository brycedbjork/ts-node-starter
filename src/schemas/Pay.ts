export interface Payment {
  id?: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
  time: number;
  job: {
    id?: string;
    type: string;
  };
}
