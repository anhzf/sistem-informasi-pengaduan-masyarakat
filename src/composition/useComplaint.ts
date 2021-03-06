import { ref, watch } from '@vue/composition-api';
import useAuthGuard from 'composition/useAuthGuard';
import { fbs, refs } from 'src/firebaseServices';
import { Complaint, WithTimestamp } from 'src/types';
import type fb from 'firebase';
import { currentUser } from 'composition/useAuth';

export interface ComplaintToObject extends Complaint, WithTimestamp {
  uid: string;
  user: fb.firestore.DocumentReference,
}

const complaintRepository = ref<ComplaintToObject[] | null>(null);

const state = ref({
  loading: false,
});

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
    state.value.loading = true;
    const querySnapshot = await refs.Complaint.where('user', '==', refs.User.doc(user.uid)).get();

    state.value.loading = false;
    return querySnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as ComplaintToObject[];
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
    { immediate: true },
  );

  return {
    complaintRepository,
    state,
    addComplaint,
    getComplaintRepository,
  };
}
