<template>
  <q-page
    class="row items-start justify-evenly q-gutter-y-lg"
    padding
  >
    <sign-in-card class="col-12 col-md-3" />
    <sign-up-card class="col-12 col-md-3" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import SignInCard from 'components/SignInCard.vue';
import SignUpCard from 'components/SignUpCard.vue';
import useGuestOnlyGuard from 'composition/useGuestOnlyGuard';

export default defineComponent({
  name: 'PageAuth',

  setup() {
    useGuestOnlyGuard();
  },

  components: {
    SignInCard,
    SignUpCard,
  },
});
</script>
