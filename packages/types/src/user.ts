export interface CMSUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  profileImageUrl?: string | null;
  createdAt: string;
}

export interface RedotUser {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string | null;
  socialProvider: string | null;
  createdAt: string;
}
