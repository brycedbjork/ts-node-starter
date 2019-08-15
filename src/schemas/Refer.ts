export interface WebReferral {
  type: "web";
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  phoneNumber: string;
  time: number;
  date: string;
}

export interface DirectReferral {
  type: "direct";
  user: {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  time: number;
  date: string;
}
