export interface ConfigJob {
  id?: string;
  name: string;
  title: string;
  seasons: ("spring" | "fall" | "summer" | "winter")[];
  image: string;
  subJobs?: ConfigJob[];
  skills?: ConfigSkill[];
}

export interface ConfigSkill {
  id?: string;
  name: string;
  title: string;
  job: string;
}
