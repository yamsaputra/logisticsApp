<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
  }
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Send a package</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="example-content">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Are you sending or bringing?</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Send a package with a traveler or make some extra money for your next travel.</p>
        
          <div class="buttons">
        <ion-button fill="clear" href="/bring">Bring a package</ion-button>
        </div>
      </ion-card-content>
      </ion-card>
    </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonButtons } from '@ionic/vue';

  export default {
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage, IonButton, IonButtons },
  };
</script>