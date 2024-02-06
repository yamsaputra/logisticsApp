<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color:black;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Messages</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">
        <ion-card color="light">
          <ion-card-header>
            <ion-card-title>HTTP ERROR: 418. I am a teapot.</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Messaging feature coming soon!</p>
          </ion-card-content>
          </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonTabs } from '@ionic/vue';

  export default {
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonTabs },
  };
</script>