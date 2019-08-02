interface BaseUser {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  auth: {
    [field: string]: string;
  };
  city: string;
  state: string;
  country: string;
  email: string;
  phoneNumber: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  gender: string;
  stripeId: string; // stripe connect
  link: string;
  bio: string;
}

export interface Student extends BaseUser {
  dob: string; // moment().format()
  school: {
    name: string;
    email: string;
    verified: boolean;
    location: string;
    graduationYear: string;
  };
  parentalApproval: boolean;
}

export interface Hirer extends BaseUser {
  customerId: string; // used to paystudents
  address: string;
}
