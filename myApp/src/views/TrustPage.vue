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
// Framework import statements.
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonPage, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonButton, 
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton, 
} from '@ionic/vue';
import { globe } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

// Local store import statement.
import store from '../store.js';


export default {
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonPage, 
    IonButton, 
    IonButtons },

  setup() {
    const { t, locale } = useI18n();
    const router = useRouter();

    const routePage = async () => {
      try {
        router.push('/route');
      } catch {
        console.log("Error");
      }
    };

    // Change the locale (language) of the page.
    const changeLocale = (newLocale) => {
      locale.value = newLocale;
    };

    return { routePage, globe, changeLocale };
  }
};
</script>