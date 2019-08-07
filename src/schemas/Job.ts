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
  invited?: {
    [uid: string]: boolean;
  };
  tags: string[];
  photo: string;
}

export interface Job extends JobPost {
  id?: string;
  active: boolean;
  status: "searching" | "claimed";
  postedTime: number;
  postedDate: string;
  hirer: {
    id: string;
    firstName: string;
    image: string;
  };
  displayLocation: string;
  matchedUsers: object;
  locationKey: string | null;
}
