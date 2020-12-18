import useAuthGuard from 'composition/useAuthGuard';
import { fbs, refs } from 'src/firebaseServices';
import { Complaint } from 'src/types';

const addComplaint = async ({ attachments, ...data }: Complaint) => {
  const complaintDoc = await refs.Complaint.add(data);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const storageRef = refs.storage.Attachment(fbs.auth.currentUser!.uid);
  const uploadTasks = attachments
    .map((attachment) => storageRef.child(`${complaintDoc.id}/${attachment.name}`).put(attachment));

  await Promise.all(uploadTasks);
};

export default function useComplaint() {
  useAuthGuard();

  return {
    addComplaint,
  };
}