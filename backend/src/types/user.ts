export interface User {
  id: number;
  name: string;
  email: string;
  major: string;
  interests?: Array<string>;
}
