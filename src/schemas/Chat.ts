export interface Message {
  type: "text" | "activity";
  from?: {
    id: string;
    firstName: string;
    image: string;
  };
  text: string;
  time: number;
  date: string;
  seenBy?: {
    [field: string]: boolean;
  };
}

export interface Chat {
  id?: string;
  active: boolean;
  hirer: {
    id: string;
    firstName: string;
    image: string;
  };
  users: {
    [id: string]: {
      active: boolean;
      firstName: string;
      image: string;
    };
  };
  job?: {
    id: string;
    type: string;
  };
  createdTime: number;
  createdDate: string;
  lastMessage: Message;
}
