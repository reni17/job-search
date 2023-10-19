<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <job-filter-sidebar-prompt/>

      <collapsible-accordion header="Job Types">
        <job-filter-sidebar-job-types/>
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filter-sidebar-organizations />
      </collapsible-accordion>
    </section>
  </div>
</template>
<script setup lang="ts">
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

import JobFilterSidebarJobTypes from "./JobFilterSidebarJobTypes.vue";
import JobFilterSidebarOrganizations from "./JobFilterSidebarOrganizations.vue";
import JobFilterSidebarPrompt from "./JobFilterSidebarPrompt.vue";

</script>
