import { ref, watch } from '@vue/composition-api';
import useAuthGuard from 'composition/useAuthGuard';
import { fbs, refs } from 'src/firebaseServices';
import { Complaint, WithTimestamp } from 'src/types';
import type fb from 'firebase';
import { currentUser } from 'composition/useAuth';

export interface FetchedComplaint extends Complaint, WithTimestamp {
  user: fb.firestore.DocumentReference
}

const complaintRepository = ref<FetchedComplaint[] | null>(null);

const addComplaint = async ({ attachments, ...data }: Complaint) => {
  const user = currentUser.value;

  if (user) {
    const complaintDoc = await refs.Complaint.add({
      user: refs.User.doc(user.uid),
      ...data,
      ...fbs.utils.withTimeStamp,
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userStorageRef = refs.storage.Attachment(user.uid);
    const storageRef = userStorageRef.child(complaintDoc.id);
    const uploadTasks = attachments
      .map((attachment) => storageRef.child(attachment.name).put(attachment));

    await Promise.all(uploadTasks);
  } else {
    throw new Error('Unauthenticated!');
  }
};

const getComplaintRepository = async () => {
  const user = currentUser.value;

  if (user) {
    const querySnapshot = await refs.Complaint.where('user', '==', refs.User.doc(user.uid)).get();

    return querySnapshot.docs.map((doc) => doc.data()) as FetchedComplaint[];
  }

  throw new Error('Unauthenticated!');
};

export default function useComplaint() {
  useAuthGuard();

  watch(
    currentUser,
    async () => {
      if (!complaintRepository.value) {
        complaintRepository.value = await getComplaintRepository();
      }
    },
  );

  return {
    complaintRepository,
    addComplaint,
    getComplaintRepository,
  };
}
