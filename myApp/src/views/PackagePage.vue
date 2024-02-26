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
        <ion-title>Packages</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">
        <ion-card color="light">
          <ion-card-header>
            <ion-card-title>HTTP ERROR: 418. I am a teapot.</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Alpha version 0.4</p>
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
    IonTabs 
  } from '@ionic/vue';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import store from '../store.js';

  export default {
    components: { 
      IonHeader, 
      IonToolbar, 
      IonTitle,
      IonContent, 
      IonPage, 
      IonTabs 
    },

    setup() {
      const router = useRouter();

      onMounted(async () => {
        try {
          const userEmail = store.state.user.email;
          console.log("packagePageUserEmail:", userEmail);
          const userID = store.state.user.ID;
          console.log("packagePageUserID:", userID);
        } catch (error) {
          console.error(error);
        }
      })
    }
  };
</script>