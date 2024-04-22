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
  tags?: string | null;
  description: string;
}

export interface SongInterface {
  id?: string;
  name: string;
  comments?: string[];
  link: string;
  lyrics?: string | null;
  description: string;
  artists?: string;
  artistId?: string;
}

export interface SongInterfaceDb {
  id: string;
  name: string;
  comments: string[];
  link: string;
  lyrics?: string | null;
  description: string;
  artists?: ArtistInterface[];
}