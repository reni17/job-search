<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative h-full flex-1 items-center pr-3">
        <label for="role" class="absolute left-0 -top-10">Role</label>
        <text-input id="role" placeholder="Software engineer" v-model="role" />
      </div>
      <span
        class="flex h-full items-center border-l border-r border-brand-gray-2 px-3"
        >in</span
      >
      <div class="relative h-full flex-1 items-center pl-3">
        <label for="location" class="absolute left-0 -top-10">Where?</label>
        <text-input
          v-model="location"
          id="location"
          placeholder="Los Angeles"
        />
      </div>
    </div>
    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ActionButton from "../Shared/ActionButton.vue";
import TextInput from "../Shared/TextInput.vue";

const router = useRouter();

const role = ref("");
const location = ref("");

const searchForJobs = () => {
  router.push({
    name: "JobsResults",
    query: {
      role: role.value,
      location: location.value,
    },
  });
};
</script>
