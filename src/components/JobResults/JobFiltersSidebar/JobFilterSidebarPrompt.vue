<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear Filters"
        type="secondary"
        @click="userStore.CLEAR_JOB_FILTERS"
      ></action-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import ActionButton from "../../Shared/ActionButton.vue";
import {  useUserStore } from "@/stores/user";
const userStore = useUserStore();

</script>