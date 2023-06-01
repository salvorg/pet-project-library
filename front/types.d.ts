export interface RegisterMutation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  [key: string]: string[];
}

export interface GlobalError {
  error: string;
  message: string;
}

export interface LoginError {
  error: string;
  message: string;
  statusCode: number;
}

export interface User {
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  role: string;
  phoneNumber: string;
  googleId?: string;
}

export interface ProfileMutation {
  email: string;
  firstName: string;
  country: string;
}

export interface Author {
  name: string;
  description: string;
  image: string | null;
}

export class AuthorApi extends Author {
  id: number;
}

export interface AuthorMutation {
  id: number;
  label: string;
}

export interface Book {
  authors: string[];
  genres: string[];
  title: string;
  description: string;
  availableCopies: number;
  publisher: string;
  image: string | null;
}

export interface BookApi {
  id: number;
  authors: string[] | null;
  genres: string[] | null;
  title: string;
  description: string;
  availableCopies: number;
  publisher: string;
  image: string | null;
}

export interface GenresApi {
  id: number;
  label: string;
}

export interface FoundUser {
  id: number;
  firstName: string;
  lastName: string;
}
