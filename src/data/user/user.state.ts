export interface UserState {
  username?: string;
  email: string;
  jwt: boolean;
  darkMode: boolean;
  isLoggedin: boolean;
  hasSeenTutorial: boolean;
  loading: boolean;
}