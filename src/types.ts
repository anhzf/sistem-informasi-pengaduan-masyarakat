import type fb from 'firebase';

export interface AuthCredential {
  email: string;
  password: string;
}

export interface User extends AuthCredential {
  fullname: string;
}

export interface Complaint {
  title: string;
  description: string;
  attachments: File[];
}

export interface WithTimestamp {
  _created: fb.firestore.Timestamp,
  _updated: fb.firestore.Timestamp,
  _deleted: fb.firestore.Timestamp,
}

export interface fbCommonError {
  message: string;
  code: string;
}
