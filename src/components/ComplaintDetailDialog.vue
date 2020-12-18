<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 700px; max-width: 80vw"
    >
      <q-card-section>
        <h5 class="q-my-xs">
          {{ data.title }}
        </h5>

        <q-separator />

        <div class="column">
          <q-scroll-area style="height: 55vh;">
            <p
              class="q-pa-sm"
              style="min-height: 40vh;"
            >
              {{ data.description }}
            </p>
          </q-scroll-area>

          <q-separator spaced />

          <div class="row justify-center">
            <h6 class="col-12 q-ma-none text-body1">
              Attachments
            </h6>

            <q-circular-progress
              v-if="attachmentLoading"
              size="lg"
              color="blue-grey-8"
              indeterminate
            />

            <q-scroll-area
              v-else
              class="col-12 text-center"
              style="height: 10vh;"
            >
              <template v-if="attachments.length > 0">
                <q-chip
                  v-for="attachment in attachments"
                  :key="attachment.fullPath"
                  clickable
                  icon="download"
                  :label="attachment.name"
                />
              </template>

              <span
                class="q-ma-none"
                v-else
              >
                Tidak ada berkas dilampirkan!
              </span>
            </q-scroll-area>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="between">
        <small><i>created at:</i> {{ data._created.toDate().toLocaleString() }}</small>
        <q-btn
          color="primary"
          label="OK"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { QDialog } from 'quasar';
import { ComplaintToObject } from 'composition/useComplaint';
import { refs } from 'src/firebaseServices';
import useAuth from 'composition/useAuth';
import type fb from 'firebase';

export default defineComponent({
  name: 'ComplaintDetailDialog',

  props: {
    data: {
      type: Object as PropType<ComplaintToObject>,
      required: true,
    },
  },

  setup() {
    const { currentUser } = useAuth();
    return {
      currentUser,
    };
  },

  data() {
    return {
      attachments: [] as fb.storage.Reference[],
      attachmentLoading: false,
    };
  },

  methods: {
    async getAttachments() {
      if (this.currentUser) {
        const ref: fb.storage.Reference = refs.storage
          .Attachment(this.currentUser.uid).child(this.data.uid);
        const { items } = await ref.listAll();

        return items;
      }
      return [] as fb.storage.Reference[];
    },

    show() {
      (this.$refs.dialog as QDialog).show();
    },
    hide() {
      (this.$refs.dialog as QDialog).hide();
    },
    onDialogHide() {
      this.$emit('hide');
    },
    onOKClick() {
      this.$emit('ok');
      this.hide();
    },
    onCancelClick() {
      this.hide();
    },
  },

  watch: {
    data: {
      immediate: true,
      async handler() {
        this.attachmentLoading = true;
        this.attachments = await this.getAttachments();
        this.attachmentLoading = false;
      },
    },
  },
});
</script>
