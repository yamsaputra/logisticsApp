import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue, 
  IonPage,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  IonFooter,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonToggle,
  IonRange,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonRow,
  IonCol,
  IonActionSheet,
  IonAlert,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonImg
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.component('IonPage', IonPage);
app.component('IonContent', IonContent);
app.component('IonTitle', IonTitle);
app.component('IonToolbar', IonToolbar);
app.component('IonHeader', IonHeader);
app.component('IonFooter', IonFooter);
app.component('IonIcon', IonIcon);
app.component('IonButton', IonButton);
app.component('IonButtons', IonButtons);
app.component('IonBackButton', IonBackButton);
app.component('IonMenuButton', IonMenuButton);
app.component('IonList', IonList);
app.component('IonItem', IonItem);
app.component('IonLabel', IonLabel);
app.component('IonInput', IonInput);
app.component('IonTextarea', IonTextarea);
app.component('IonSelect', IonSelect);
app.component('IonSelectOption', IonSelectOption);
app.component('IonDatetime', IonDatetime);
app.component('IonToggle', IonToggle);
app.component('IonRange', IonRange);
app.component('IonRefresher', IonRefresher);
app.component('IonRefresherContent', IonRefresherContent);
app.component('IonSearchbar', IonSearchbar);
app.component('IonSegment', IonSegment);
app.component('IonSegmentButton', IonSegmentButton);
app.component('IonFab', IonFab);
app.component('IonFabButton', IonFabButton);
app.component('IonFabList', IonFabList);
app.component('IonGrid', IonGrid);
app.component('IonRow', IonRow);
app.component('IonCol', IonCol);
app.component('IonActionSheet', IonActionSheet);
app.component('IonAlert', IonAlert);
app.component('IonBadge', IonBadge);
app.component('IonCard', IonCard);
app.component('IonCardContent', IonCardContent);
app.component('IonCardHeader', IonCardHeader);
app.component('IonCardSubtitle', IonCardSubtitle);
app.component('IonCardTitle', IonCardTitle);
app.component('IonCheckbox', IonCheckbox);
app.component('IonChip', IonChip);
app.component('IonImg', IonImg);

  
router.isReady().then(() => {
  app.mount('#app');
});