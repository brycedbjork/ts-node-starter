export interface JobPost {
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timing: string; // flexible or moment().format()
  wage: {
    type: string;
    amount: number;
  };
  hours: number;
  description: string;
  recurring: boolean;
}

export interface Job extends JobPost {
  id: string;
  active: boolean;
  postedTime: number;
  postedDate: string;
  claimed: boolean;
  hirer: {
    id: string;
    firstName: string;
    image: string;
  };
  displayLocation: string;
  matchedUsers: object;
}
