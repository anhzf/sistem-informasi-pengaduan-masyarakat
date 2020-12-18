<template>
  <q-item
    clickable
    tag="a"
    :to="to"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label
        v-if="caption"
        caption
      >
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Location } from 'vue-router';

export default defineComponent({
  name: 'DrawerMenu',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    to: {
      type: Location,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
