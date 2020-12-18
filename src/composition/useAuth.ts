import { ref } from '@vue/composition-api';
import { fbs, refs } from 'src/firebaseServices';
import type fb from 'firebase';
import type { AuthCredential, User } from 'src/types';

const userConverter = (user: fb.User) => ({
  email: user.email,
  uid: user.uid,
  fullname: '',
} as (Omit<User, 'password'> & {uid: string}));

export const currentUser = ref(fbs.auth.currentUser && userConverter(fbs.auth.currentUser));

const signUp = async ({ email, password, fullname }: User) => {
  const userCreated = await fbs.auth.createUserWithEmailAndPassword(email, password);
  const userDoc = refs.User.doc(userCreated.user?.uid);

  await userDoc.set({
    email,
    fullname,
    ...fbs.utils.withTimeStamp,
  });
};

const signIn = async (user: AuthCredential) => {
  await fbs.auth.signInWithEmailAndPassword(user.email, user.password);
};

const signOut = () => fbs.auth.signOut();

fbs.auth.onAuthStateChanged((user) => {
  currentUser.value = user && userConverter(user);
});

export default function useAuth() {
  return {
    currentUser,
    signUp,
    signIn,
    signOut,
  };
}
