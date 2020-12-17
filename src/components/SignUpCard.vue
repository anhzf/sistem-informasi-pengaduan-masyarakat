<template>
  <q-card>
    <q-form
      ref="signUpForm"
      @submit.prevent.stop="onSignUp"
      @reset.prevent.stop="onReset"
    >
      <q-card-section class="column">
        <h5 class="q-ma-none self-center">
          Sign Up
        </h5>

        <q-input
          v-model="fullname"
          label="Fullname"
          :rules="[requiredValidation]"
        />
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
        <q-input
          v-model="passwordConfirm"
          label="Password Confirmation"
          type="password"
          :rules="[shouldSameValidation(password, 'password')]"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Sign Up"
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useAuth from 'composition/useAuth';
import useFormValidation from 'composition/useFormValidation';
import type { QForm } from 'quasar';
import type { fbCommonError } from 'src/types';

export default defineComponent({
  name: 'SignUpCard',

  setup() {
    return {
      ...useAuth(),
      ...useFormValidation(),
    };
  },

  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },

  methods: {
    async onSignUp() {
      const el = this.$refs.signUpForm as QForm;
      const isValidated = await el.validate();

      if (isValidated) {
        this.$q.loading.show();
        try {
          await this.signUp({
            fullname: this.fullname,
            email: this.email,
            password: this.password,
          });

          el.reset();
        } catch (err) {
          this.$q.notify({
            type: 'negative',
            message: (err as fbCommonError).message,
          });
        }
        this.$q.loading.hide();
      }
    },

    onReset() {
      this.fullname = '';
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
    },
  },
});
</script>
