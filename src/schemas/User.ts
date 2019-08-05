interface NotificationPreference {
  push: boolean;
  text: boolean;
  email: boolean;
}

export interface BaseUser {
  id: string;
  type: string;
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
  gender?: string;
  stripeId?: string; // stripe connect
  link?: string;
  bio?: string;
  locationKey?: string;
  pushToken?: string;
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
  notifications: {
    chat: NotificationPreference;
    job: NotificationPreference;
    paid: NotificationPreference;
    request: NotificationPreference;
  };
}

export interface Hirer extends BaseUser {
  customerId: string; // used to pay students
  address: string;
  notifications: {
    chat: NotificationPreference;
    claimed: NotificationPreference;
  };
}
