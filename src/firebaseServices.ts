import firebase from 'src/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import type { WithTimestamp } from 'src/types';

export const fbs = {
  auth: firebase.auth(),
  db: firebase.firestore(),
  storage: firebase.storage().ref(),

  utils: {
    get now() {
      return firebase.firestore.Timestamp.now();
    },

    get withTimeStamp() {
      const { now } = this;
      return {
        _created: now,
        _updated: now,
        _deleted: now,
      } as WithTimestamp;
    },
  },
} as const;

export const refs = {
  User: fbs.db.collection('users'),
  Complaint: fbs.db.collection('complaints'),

  storage: {
    Attachment(userId: string) {
      return fbs.storage.child(userId);
    },
  },
} as const;
