import { watch } from '@vue/composition-api';
import { currentUser } from 'composition/useAuth';
import { Loading } from 'quasar';
import { Router } from 'src/router';

export default function useGuestOnlyGuard() {
  watch(
    currentUser,
    () => {
      if (currentUser.value) {
        Loading.show();
        Router.push({ ...Router.currentRoute, name: 'Dashboard' })
          .finally(() => Loading.hide());
      }
    },
    { immediate: true },
  );
}
