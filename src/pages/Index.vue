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
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width>
            Actions
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              label="see details"
              color="primary"
              flat
              @click="showDetail(props)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ComplaintDetailDialog from 'components/ComplaintDetailDialog.vue';
import useAuthGuard from 'composition/useAuthGuard';
import useComplaint, { ComplaintToObject } from 'composition/useComplaint';
import type fb from 'firebase';
import type { q } from 'src/types';

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
      ] as q.Table.Column<ComplaintToObject>[],
    };
  },

  computed: {
    complaints() {
      return this.complaintRepository ?? [];
    },
  },

  methods: {
    showDetail(data: q.Table.BodyProps) {
      this.$q.dialog({
        component: ComplaintDetailDialog,
        parent: this,
        data: data.row,
      });
    },
  },
});
</script>
