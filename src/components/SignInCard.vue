<template>
  <q-card>
    <q-form
      ref="signInForm"
      @submit="onSignIn"
      @reset="onReset"
    >
      <q-card-section class="column items-stretch">
        <h5 class="q-ma-none self-center">
          Sign In
        </h5>

        <q-input
          v-model="email"
          label="Email"
          type="email"
          :rules="[requiredValidation]"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="[requiredValidation]"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          type="submit"
          label="Sign In"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useAuth from 'composition/useAuth';
import useFormValidation from 'composition/useFormValidation';
import type { fbCommonError } from 'src/types';
import { QForm } from 'quasar';

export default defineComponent({
  name: 'SignInCard',

  setup() {
    return {
      ...useAuth(),
      ...useFormValidation(),
    };
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async onSignIn() {
      this.$q.loading.show();
      try {
        await this.signIn({
          email: this.email,
          password: this.password,
        });
        (this.$refs.signInForm as QForm).reset();
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: (err as fbCommonError).message,
        });
      }
      this.$q.loading.hide();
    },

    onReset() {
      this.email = '';
      this.password = '';
    },
  },
});
</script>
