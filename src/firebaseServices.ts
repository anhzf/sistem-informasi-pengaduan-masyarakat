import firebase from 'src/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import type { WithTimestamp } from 'src/types';

export const fbs = {
  auth: firebase.auth(),
  db: firebase.firestore(),

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
} as const;
