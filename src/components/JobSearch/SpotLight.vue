<template>
  <ul>
    <li v-for="spotlight in spotLights" :key="spotlight.id">
      <!-- pass the data up to the parent -->
      <slot
        :img="spotlight.img"
        :description="spotlight.description"
        :title="spotlight.title"
      ></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

interface SpotLight {
  id: number,
  img: string,
  title: string,
  description: string
} 

const spotLights = ref<SpotLight[]>([]);

onMounted(async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const res = await axios.get<SpotLight[]>(url);
  spotLights.value = res.data;
});
</script>
