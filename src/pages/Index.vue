<template>
  <q-page
    class="row justify-center items-stretch"
    padding
  >
    <q-table
      :columns="columns"
      :data="complaints"
      row-key="title"
      card-class="full-width"
      :loading="state.loading"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useAuthGuard from 'composition/useAuthGuard';
import useComplaint, { FetchedComplaint } from 'composition/useComplaint';
import type fb from 'firebase';

interface Column<T> {
  name: string
  label: string
  field: string | ((row: T) => unknown)
  required?: boolean
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  sort?: () => unknown
  format?: (v: unknown) => string
  style?: string
  classes?: string
  headerStyle?: string
  headerClasses?: string
}

export default defineComponent({
  name: 'PageIndex',

  setup() {
    useAuthGuard();
    const { complaintRepository, state } = useComplaint();

    return {
      complaintRepository,
      state,
    };
  },

  data() {
    return {
      columns: [
        {
          name: 'title',
          label: 'Title',
          field: (row) => row.title,
          align: 'left',
          sortable: true,
        },
        {
          name: 'created',
          label: 'Created',
          field: (row) => row._created,
          align: 'left',
          format: (v) => (v as fb.firestore.Timestamp).toDate().toLocaleString(),
          sortable: true,
        },
      ] as Column<FetchedComplaint>[],
    };
  },

  computed: {
    complaints() {
      return this.complaintRepository ?? [];
    },
  },
});
</script>
