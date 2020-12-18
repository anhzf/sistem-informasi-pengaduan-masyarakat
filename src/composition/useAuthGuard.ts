import { watch } from '@vue/composition-api';
import { currentUser } from 'composition/useAuth';
import { Loading } from 'quasar';
import { Router } from 'src/router';

export default function useAuthGuard() {
  watch(
    currentUser,
    () => {
      if (!currentUser.value) {
        Loading.show();
        Router.push({ ...Router.currentRoute, name: 'Auth' })
          .finally(() => Loading.hide());
      }
    },
    { immediate: true },
  );
}
