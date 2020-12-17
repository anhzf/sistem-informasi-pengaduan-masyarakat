import { fbs, refs } from 'src/firebaseServices';
import { User } from 'src/types';

export default function useAuth() {
  const signUp = async (user: User) => {
    const userCreated = await fbs.auth.createUserWithEmailAndPassword(user.email, user.password);
    const userDoc = refs.User.doc(userCreated.user?.uid);

    await userDoc.set({
      ...user,
      ...fbs.utils.withTimeStamp,
    });
  };

  return {
    signUp,
  };
}
