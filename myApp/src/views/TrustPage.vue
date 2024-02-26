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
        <ion-title>{{ $t('header') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <div class="example-content">
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ $t('title') }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ $t('description') }}</p>

            <div class="buttons">
              <ion-button fill="clear" @click="routePage">{{ $t('button') }}</ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonButtons } from '@ionic/vue';
import { useRouter } from 'vue-router';


export default {
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage, IonButton, IonButtons },

  setup() {
    const router = useRouter();

    const routePage = async () => {
      try {
        router.push('/route');
      } catch {
        console.log("Error");
      }
    };

    return { routePage };
  }
};
</script>