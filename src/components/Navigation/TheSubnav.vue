<template>
  <div class="h-16 w-full border-b border-brand-gray-1 bg-white">
    <div v-if="onJobResultsPage" class="flex h-full items-center px-8">
      <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
      <span
        ><span class="text-brand-green-1">{{
          FILTERED_JOBS.length
        }}</span>
        jobs matched</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJobsStore } from "@/stores/jobs";
import {computed} from "vue"
import { useRoute } from "vue-router";

const route = useRoute()
const onJobResultsPage = computed(() => {
  return route.name === "JobsResults";
})

const jobsStore = useJobsStore()
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)


</script>
