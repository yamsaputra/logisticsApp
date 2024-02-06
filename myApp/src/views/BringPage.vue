

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bring Page</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="floating">Origin</ion-label>
          <ion-input v-model="origin"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Destination</ion-label>
          <ion-input v-model="target"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Date & Time</ion-label>
          <ion-datetime v-model="selectedDate"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Amount of Kgs</ion-label>
          <ion-input v-model="email"></ion-input>
        </ion-item>

      <ion-item>
          <ion-label position="floating">Contact number</ion-label>
          <ion-input v-model="number"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="full" @click="bringStuff">Submit</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from 'vue';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';
export default {

  setup() {
    const depart = ref();
    const target = ref();
    const selectedDate = ref();
    const number = ref();

    const bringStuff = async () => {
      try {
        const bringData = {
          depart: this.depart,
          target: this.target,
          selectedDate: this.selectedDate,
          number: this.number
        };
        console.log(bringData);

        if (this.depart == null) {
          window.alert("Please enter your departure location.");
          return;
        }
        if (this.target == null) {
          window.alert("Please enter your target location.");
          return;
        }
        if (this.selectedDate == null) {
          window.alert("Please enter your date and time.");
          return;
        }
        console.log(bringData);

        const response = await registerStuff(bringData);
        
      } catch (error) {
        console.error(error);
      }
      console.log('Form submitted');
    };
    return {
      depart,
      target,
      number,
      selectedDate,
      bringStuff
    };
  }
};
</script>