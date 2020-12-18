<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Sistem Informasi Pengaduan Masyarakat
        </q-toolbar-title>

        <div
          v-if="currentUser"
          class="row items-center q-gutter-x-sm"
        >
          <span style="text-decoration: underline">{{ currentUser.email }}</span>
          <q-btn
            label="Sign Out"
            flat
            @click="signOut"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <drawer-menu
          title="Daftar Ajuan"
          icon="list"
          to="complaints"
        />
        <drawer-menu
          title="Tambah Ajuan"
          icon="add"
          :to="{name: 'AddComplaint'}"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import DrawerMenu from 'components/DrawerMenu.vue';
import { defineComponent, ref } from '@vue/composition-api';
import useAuth from 'composition/useAuth';
import { fbCommonError } from 'src/types';

export default defineComponent({
  name: 'MainLayout',

  components: { DrawerMenu },

  setup() {
    const leftDrawerOpen = ref(false);
    const { currentUser, signOut } = useAuth();

    return {
      currentUser,
      signOut,
      leftDrawerOpen,
    };
  },

  methods: {
    onSignOut() {
      this.$q.loading.show();
      this.signOut()
        .catch((err) => this.$q.notify({
          type: 'negative',
          message: (err as fbCommonError).message,
        }))
        .finally(() => this.$q.loading.hide());
    },
  },
});
</script>
