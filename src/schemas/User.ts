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
  dob: string;
  referral?: string;
}

export interface NewHirer {
  type: "hirer";
  image: string;
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
}

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
  };
  joinedTime: number;
  joinedDate: string;
  gender?: "male" | "female" | "other";
  stripeId?: string; // stripe connect
  bio?: string;
  locationKey: string | null;
  pushToken?: string;
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
  };
  joinedTime: number;
  joinedDate: string;
  pushToken?: string;
}
