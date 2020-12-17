<template>
  <q-card>
    <q-card-section class="column items-stretch">
      <h5 class="q-ma-none self-center">
        Sign In
      </h5>

      <q-input
        v-model="email"
        label="Email"
        type="email"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        label="Sign In"
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignInCard',

  data() {
    return {
      email: '',
      password: '',
    };
  },
});
</script>
