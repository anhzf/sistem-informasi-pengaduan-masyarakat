import { fbs, refs } from 'src/firebaseServices';
import { User } from 'src/types';

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

  return {
    signUp,
  };
}
