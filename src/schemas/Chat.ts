export interface Message {
  type: "text" | "activity";
  from?: {
    id: string;
    firstName: string;
  };
  text: string;
  time: number;
  date: string;
}

export interface Chat {
  id?: string; // chat data is stored in key(id) value(data) but can be consolidated with id
  active: boolean;
  hirer: {
    id: string;
    firstName: string;
  };
  users: {
    [id: string]: {
      active: boolean;
      firstName: string;
    };
  };
  job?: {
    id: string;
    type: string;
  };
  createdTime: number;
  createdDate: string;
  lastMessage: Message;
  readBy: {
    [uid: string]: boolean;
  };
}
