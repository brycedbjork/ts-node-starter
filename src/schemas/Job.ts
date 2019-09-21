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
  public: boolean;
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
  };
  displayLocation: string;
  matchedUsers: {
    [userId: string]: boolean;
  };
  locationKey: string | null;
}
