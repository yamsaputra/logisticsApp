<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import tabs from './components/ion-tabs.vue';

export default defineComponent({
  name: 'App',
  components: { IonApp, IonRouterOutlet }
});
</script>
