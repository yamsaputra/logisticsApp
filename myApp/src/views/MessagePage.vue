<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: black;
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('messageTitle') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-fab slot="fixed" horizontal="end" :edge="true">
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="bottom">
        <ion-fab-button @click="changeLocale('id')">
          ID
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('en')">
          EN
        </ion-fab-button>
        <ion-fab-button @click="changeLocale('de')">
          DE
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content>
      <div class="example-content">
        <ion-card color="light">
          <ion-card-header>
            <ion-card-title>HTTP ERROR 418: I am a teapot.</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ $t('messageDesc') }}</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonTabs,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { ref } from 'vue';
import store from '../store.js';

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonTabs,
    IonFab,
    IonFabButton,
  },

  setup() {
    const changeLocale = (locale) => {
      store.commit('setLocale', locale);
    };

    return {
      changeLocale,
      globe
    };
  }
};
</script>