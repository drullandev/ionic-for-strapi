export interface UserState {
  nickname?: string;
  email: string;
  jwt: boolean;
  darkMode: boolean;
  isLoggedin: boolean;
  hasSeenTutorial: boolean;
  loading: boolean;
}