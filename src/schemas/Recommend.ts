export interface Recommendation {
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
}

export interface RecommendationRequest {
  user: {
    id: string;
    firstName: string;
  };
  from: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  message: string;
  time: number;
  date: string;
}
