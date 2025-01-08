<style scoped>

</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="backbutton" slot="start" fill="clear" @click="router.back()">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('titleRoute') }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="no-scroll ion-padding">
      <form>
        <ion-list>
          <ion-item>
            <ion-input :label="$t('originRoute')" labelPlacement="floating" v-model="depart"></ion-input>
          </ion-item>

          <ion-item>
            <ion-input :label="$t('destinationRoute')" labelPlacement="floating" v-model="target"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>{{ $t('dateRoute') }}</ion-label>
            <ion-datetime display-format="YYYY-MM-DD" picker-format="YYYY-MM-DD" v-model="departureTime"></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-input :label="$t('pricePerKGRoute')" labelPlacement="floating" v-model="price"></ion-input>
          </ion-item>

          <ion-item>
            <ion-input :label="$t('descRoute')" labelPlacement="floating" v-model="description"></ion-input>
          </ion-item>
        </ion-list>

        <ion-button expand="full" @click="bringStuff">{{ $t('submitRoute') }}</ion-button>
      </form>

      <ion-alert
        :is-open="showAlert"
        :message="alertMessage"
        buttons="OK"
        @didDismiss="showAlert = false"
      ></ion-alert>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonHeader,
  IonButton,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonDatetime,
  IonBackButton,
  IonButtons,
  IonAlert,
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerRoute } from '../services/postRequests.js';
import store from '../store.js';

export default {
  components: {
    IonHeader,
    IonButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonDatetime,
    IonBackButton,
    IonAlert,
  },
  setup() {
    const router = useRouter();
    const depart = ref('');
    const target = ref('');
    const departureTime = ref("");
    const price = ref('');
    const description = ref('');
    const userID = ref(null);
    const userEmail = ref(store.state.user.email);
    const showAlert = ref(false);
    const alertMessage = ref("");

    console.log('bringPageDate:', departureTime.value);

    onMounted(() => {
      try {
        userEmail.value = store.state.user.email;
        console.log("bringPageUser:", userEmail.value);
        userID.value = store.state.user.ID;
        console.log("bringPageUserID:", userID.value);
      } catch (error) {
        console.error(error);
      }
    });

    const bringStuff = async () => {
      try {

       if (!store.state.user.ID) {
        alertMessage.value = "Please log in to submit a route.";
        showAlert.value = true;
        return;
      }

      if (!depart.value) {
        alertMessage.value = "Please enter your origin.";
        showAlert.value = true;
        return;
      }

      if (!target.value) {
        alertMessage.value = "Please enter your destination.";
        showAlert.value = true;
        return;
      }

      if (!departureTime.value) {
        alertMessage.value = "Please enter departure date & time.";
        showAlert.value = true;
        return;
      }

      if (!price.value) {
        alertMessage.value = "Please enter a price.";
        showAlert.value = true;
        return;
      }

      if (!description.value) {
        alertMessage.value = "Please enter a description.";
        showAlert.value = true;
        return;
      }

        console.log('Form Submit Time:', departureTime.value);

        const date = departureTime.value.split("T")[0];
        const time = departureTime.value.split("T")[1];

        const bringData = {
          origin: depart.value,
          destination: target.value,
          date: departureTime.value,
          time: time,
          price: price.value,
          description: description.value,
          email: userEmail.value
        };

        const response = await registerRoute(bringData, userID.value);

        if (response.success) {
          console.log('Success:', response);
          window.alert('Your offer has been submitted.');
          router.push('/package').then(() => {
            console.log('Route to package page.');
            router.go(0);
          });
        } else {
          console.error('Failed to submit offer:', response);
          window.alert('Failed to submit offer. Please try again.');
        }

        console.log('originBring:', depart.value);
        console.log('targetBring:', target.value);
        console.log('dateBring:', date);
        console.log('timeBring:', time);
        console.log('priceBring:', price.value);
        console.log('descriptionBring:', description.value);
        console.log('userEmail:', userEmail.value);

      } catch (error) {
        console.error(error);
      }
    };

    const changeLocale = (locale) => {
      store.commit('setLocale', locale);
    };

    return {
      depart,
      target,
      departureTime,
      price,
      description,
      bringStuff,
      router,
      IonBackButton,
      IonButtons,
      IonHeader,
      IonButton,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonDatetime,
      changeLocale,
      showAlert,
      alertMessage,
  }
}
};
</script>