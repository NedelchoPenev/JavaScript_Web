import { Photo } from './photo';

export interface User {
  id: string;
  username: string;
  introduction: string;
  age: number;
  created: Date;
  lastActive: Date;
  country: string;
  photoUrl: string;
  photos: Photo[];
}
