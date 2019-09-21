export interface Review {
  id?: string;
  by: {
    id: string;
    firstName: string;
  };
  user: {
    id: string;
    firstName: string;
  };
  date: string;
  time: number;
  rating: number;
  review: string;
  job: {
    id?: string;
    type: string;
  };
}
