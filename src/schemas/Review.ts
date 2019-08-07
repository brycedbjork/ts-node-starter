export interface Review {
  id?: string;
  by: {
    id: string;
    firstName: string;
    image: string;
  };
  user: {
    id: string;
    firstName: string;
    image: string;
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
