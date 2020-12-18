import { watch } from '@vue/composition-api';
import { currentUser } from 'composition/useAuth';
import { LoadingBar } from 'quasar';
import { Router } from 'src/router';

export default function useAuthGuard() {
  watch(
    currentUser,
    () => {
      if (!currentUser.value) {
        LoadingBar.start();
        Router.push({ ...Router.currentRoute, name: 'Auth' })
          .finally(() => LoadingBar.stop());
      }
    },
  );
}
