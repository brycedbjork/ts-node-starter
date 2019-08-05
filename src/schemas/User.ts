interface NotificationPreference {
  push: boolean;
  text: boolean;
  email: boolean;
}

export interface BaseUser {
  id?: string;
  type: "student" | "hirer";
  image: string;
  firstName: string;
  lastName: string;
  auth: {
    [field: string]: string;
  };
  city: string;
  state?: string;
  country: string;
  email: string;
  phoneNumber: string;
  gender?: "male" | "female" | "other";
  stripeId?: string; // stripe connect
  link?: string;
  bio?: string;
  locationKey?: string;
  pushToken?: string;
  notifications?: {
    [field: string]: NotificationPreference;
  };
}

export interface Student extends BaseUser {
  dob: string; // moment().format()
  school?: {
    name: string;
    email: string;
    verified: boolean;
    location: string;
    graduationYear: string;
  };
  parentalApproval?: boolean;
}

export interface Hirer extends BaseUser {
  customerId: string; // used to pay students
  address: string;
}
