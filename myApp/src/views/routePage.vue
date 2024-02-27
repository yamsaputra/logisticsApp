<style scoped>

</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons class="backbutton" slot="start" fill="clear" @click="router.back()">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Planning a trip?</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="no-scroll ion-padding">
      <form>
        <ion-list>
          <ion-item>
            <ion-input :label="('Origin')" labelPlacement="floating" v-model="depart"></ion-input>
          </ion-item>

          <ion-item>
            <ion-input :label="('Destination')" labelPlacement="floating" v-model="target"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Date & Time</ion-label>
            <ion-datetime :label="('Date & Time')" labelPlacement="floating" v-model="selectedDate"></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-input :label="('Price per KG in €')" labelPlacement="floating" v-model="price"></ion-input>
          </ion-item>

          <ion-item>
            <ion-input :label="('Description')" labelPlacement="floating" v-model="description"></ion-input>
          </ion-item>

          <!-- <ion-item>
            <ion-label position="floating">Contact number</ion-label>
            <ion-input v-model="number"></ion-input>
          </ion-item> -->
        </ion-list>

        <ion-button expand="full" @click="bringStuff">Submit</ion-button>
      </form>
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
  IonButtons
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerRoute } from '../services/postRequests.js';
import { getUserData } from '../services/getRequests.js';
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
  },
  setup() {
    const router = useRouter();
    const depart = ref('');
    const target = ref('');
    const selectedDate = ref(new Date().toISOString());
    const price = ref('');
    const description = ref('');
    const dateObject = new Date();
    const userID = ref(null);
    let userEmail = ref(null);

    console.log('bringPageDate:', selectedDate.value);



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

        if (!userID.value) {
          window.alert("Please log in to submit a route.");
          return;
        }

        console.log('Form Submit Time:', selectedDate.value);

        const date = dateObject.toISOString().split('T')[0];
        const time = dateObject.toISOString().split('T')[1].split('.')[0];

        const bringData = {
          origin: depart.value,
          destination: target.value,
          date: date,
          time: time,
          price: price.value,
          description: description.value,
          email: userEmail.value
        };

        if (depart.value == null) {
          window.alert("Please enter your origin.");
          return;
        }

        if (target.value == null) {
          window.alert("Please enter your destination.");
          return;
        }

        if (selectedDate.value == null) {
          window.alert("Please enter departure date & time.");
          return;
        }

        if (price.value == null) {
          window.alert("Please enter a price.");
          return;
        }

        if (description.value == null) {
          window.alert("Please enter a description.");
          return;
        }

        const response = await registerRoute(bringData, userID.value);

        if (response.success) {
          console.log('Success:', response);
          window.alert('Your offer has been submitted.');
          router.push('/home');
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
    return {
      depart,
      target,
      selectedDate,
      price,
      description,
      bringStuff,
      router,
      IonBackButton,
      IonButtons,
      IonHeader,
      IonButton,
    };
  }
};
</script>