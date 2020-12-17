import type fb from 'firebase';

export interface User {
  fullname: string;
  email: string;
  password: string;
}

export interface WithTimestamp {
  _created: fb.firestore.Timestamp,
  _updated: fb.firestore.Timestamp,
  _deleted: fb.firestore.Timestamp,
}
