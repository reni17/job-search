<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displaydJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center"></div>
        <router-link
          v-if="previousPage"
          role="link"
          :to="{ name: 'JobsResults', query: { page: previousPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          >Previous</router-link
        >

        <router-link
          v-if="nextPage"
          role="link"
          :to="{ name: 'JobsResults', query: { page: nextPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          >Next</router-link
        >
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import JobListing from "./JobListing.vue";
import { useJobsStore } from "@/stores/jobs";
import { computed, onMounted } from "vue";
import useNextAndPreviousPage from "@/composables/useNextAndPreviousPage";

const jobStore = useJobsStore();

onMounted(jobStore.FETCH_JOBS);
const FILTERED_JOBS = computed(() => jobStore.FILTERED_JOBS);

const route = useRoute();
const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || "1")
);

const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { nextPage, previousPage } = useNextAndPreviousPage(currentPage, maxPage);

const displaydJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndx = (pageNumber - 1) * 10;
  const lastJobIndx = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndx, lastJobIndx);
});
</script>
