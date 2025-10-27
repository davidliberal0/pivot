export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  major: string;
  interests?: Array<string>;
}
