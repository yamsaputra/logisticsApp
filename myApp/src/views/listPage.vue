<style scoped>
/* Add your custom styles here */
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>List Page</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
    <ion-card v-for="item in items" :key="item.id">
      <ion-card-header>
        <ion-card-title>{{ searchQuery }}</ion-card-title>
        <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <!-- Here you can add additional information about the item if needed -->
        Here's a small text description for the card content. Nothing more, nothing less.
      </ion-card-content>

      <ion-button fill="clear">Action 1</ion-button>
      <ion-button fill="clear">Action 2</ion-button>
    </ion-card>
  </ion-content>
  </ion-page>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getRouteData } from '../services/getRequests.js'; // Replace with your API service
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/vue';
import { search } from 'ionicons/icons';

export default {
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  },
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const searchQuery = ref(route.params.query);
    const items = ref([]);

    /* watch(searchQuery, async (newValue) => {
        console.log('watch searchQuery:', searchQuery.value)
        try {
          // Fetch items from the database based on the search query
          const response = await getRouteData(newValue); // Adjust this function to match your API endpoint
          if (response.ok) {
            const data = await response.json();
            items.value = data.items; // Assuming the response contains an array of items
          } else {
            throw new Error('Failed to fetch items');
          }
        } catch (error) {
          console.error(error);
        }
      }
    ); */
    onMounted(() => {
        console.log('searchQuery:', searchQuery.value);
    });

    return { items, searchQuery };
  },
};
</script>