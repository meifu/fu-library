export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginField {
  email: string;
  password: string;
}

export interface ArtistInterface {
  id?: string;
  name: string;
  genre: string;
  image: string;
  tags?: string;
  description: string;
}