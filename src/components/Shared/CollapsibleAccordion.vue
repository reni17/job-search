<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex flex-wrap items-center justify-between"
      role="button"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <!-- default text in slot -->
      <slot>
        <p>You forgot to populate this!</p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};
const caretIcon = computed(() =>
  isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]
);

// data() {
//   return {
//     isOpen: false,
//   };
// },
// computed: {
//   caretIcon() {
//     return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
//   },
// },
// methods: {
//   open() {
//     this.isOpen = !this.isOpen;
//   },
// },
</script>
