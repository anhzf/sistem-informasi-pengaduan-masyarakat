<template>
  <q-page
    class="row items-start"
    padding
  >
    <h1>Dashboard</h1>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import useAuthGuard from 'composition/useAuthGuard';

export default defineComponent({
  name: 'PageIndex',

  setup() {
    useAuthGuard();
  },
});
</script>
