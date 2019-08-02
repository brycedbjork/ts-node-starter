export interface JobPost {
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timing: {
    type: string;
    date: null;
  };
  wage: {
    type: string;
    amount: number;
  };
  hours: number;
  description: string;
  recurring: boolean;
}

export interface Job {
  id: string;
  type: string;
  active: boolean;
  displayLocation: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timing: {
    type: string;
    date: null;
  };
  wage: {
    type: string;
    amount: number;
  };
  hours: number;
  description: string;
  recurring: boolean;
  postedTime: number;
  claimed: boolean;
  hirer: {
    id: string;
    firstName: string;
    image: string;
  };
  matchedUsers: object;
}
