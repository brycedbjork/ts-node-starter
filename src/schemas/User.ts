interface NotificationPreference {
  push: boolean;
  text: boolean;
  email: boolean;
}

interface JobPreference {
  active: boolean;
  tags: {
    [tagName: string]: boolean;
  };
}

export interface NewStudent {
  type: "student";
  image: string | null;
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
  dob: string;
  referral?: string;
  coordinates?: {
    longitude: number;
    latitude: number;
  };
  bio?: string;
}

export interface NewHirer {
  type: "hirer";
  image: string | null;
  firstName: string;
  lastName: string;
  auth: {
    [field: string]: string;
  };
  address: string;
  city: string;
  state?: string;
  country: string;
  email: string;
  phoneNumber: string;
  referral?: string;
  coordinates?: {
    longitude: number;
    latitude: number;
  };
  bio?: string;
}

export type NewUser = NewHirer | NewStudent;

export interface Student extends NewStudent {
  id?: string;
  school?: {
    name: string;
    email: string;
    verified: boolean;
    location: string;
    graduationYear: string;
  };
  parentalApproval?: boolean;
  jobs: {
    [jobName: string]: JobPreference;
  };
  notifications: {
    jobs: NotificationPreference;
    chat: NotificationPreference;
    payment: NotificationPreference;
  };
  joinedTime: number;
  joinedDate: string;
  gender?: "male" | "female" | "other";
  stripeId?: string; // stripe connect
  locationKey: string | null;
  pushToken?: string;
  tester?: boolean;
}

export interface Hirer extends NewHirer {
  id?: string;
  customerId: string | null; // used to pay students
  address: string;
  stripeId?: string; // stripe connect
  locationKey: string | null;
  notifications: {
    jobs: NotificationPreference;
    chat: NotificationPreference;
    payment: NotificationPreference;
  };
  joinedTime: number;
  joinedDate: string;
  pushToken?: string;
  tester?: boolean;
}

export type User = Hirer | Student;
export type UserTypes = "hirer" | "student";
