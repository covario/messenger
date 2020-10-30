export enum ConnectionStats {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}

export interface UserProfile {
  userId: string;
  lastSent: string;
  lastSeen: string;
  displayName: string;
  directChatId: string;
  connectionStatus: ConnectionStats;
  handleContactClick: () => void;
}

export const initialUserState: UserProfile = {} as UserProfile;
