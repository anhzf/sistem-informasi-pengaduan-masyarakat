<template>
  <q-page
    class="column"
    padding
  >
    <q-card>
      <q-form
        ref="addComplaintForm"
        @submit="onAddComplaint"
        @reset="onReset"
      >
        <q-card-section>
          <h5 class="q-my-xs">
            Tambah Aduan
          </h5>

          <div class="q-pa-sm column q-gutter-sm">
            <q-input
              v-model="title"
              outlined
              label="Title"
              :rules="[requiredValidation]"
            />
            <q-input
              v-model="description"
              outlined
              label="Description"
              type="textarea"
              :rules="[requiredValidation]"
            />
            <q-file
              v-model="attachments"
              outlined
              label="Attachments (optional)"
              multiple
              use-chips
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Tambah"
            type="submit"
            icon="add"
            color="primary"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useAuthGuard from 'composition/useAuthGuard';
import useFormValidation from 'composition/useFormValidation';
import useComplaint from 'composition/useComplaint';
import { Notify, QForm } from 'quasar';
import { fbCommonError } from 'src/types';

export default defineComponent({
  name: 'PageAddComplaint',

  setup() {
    useAuthGuard();

    return {
      ...useFormValidation(),
      ...useComplaint(),
    };
  },

  data() {
    return {
      title: '',
      description: '',
      attachments: [] as File[],
    };
  },

  methods: {
    async onAddComplaint() {
      this.$q.loading.show();

      try {
        await this.addComplaint({
          title: this.title,
          description: this.description,
          attachments: this.attachments,
        });

        (this.$refs.addComplaintForm as QForm).reset();

        Notify.create({
          type: 'positive',
          message: 'Aduan telah ditambahkan!',
        });
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (err.message) {
          Notify.create({
            type: 'negative',
            message: (err as fbCommonError).message,
          });
        } else {
          // eslint-disable-next-line no-console
          console.log({ ...err });
        }
      }

      this.$q.loading.hide();
    },

    onReset() {
      this.title = '';
      this.description = '';
      this.attachments = [];
    },
  },
});
</script>
