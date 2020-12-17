import { fbs, refs } from 'src/firebaseServices';
import type { AuthCredential, User } from 'src/types';

export default function useAuth() {
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

  return {
    signUp,
    signIn,
    signOut,
  };
}
