<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses"> {{ action }} </span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job</h2>
  </section>
</template>

<script setup lang="ts">
import nextElementInList from "@/utils/nextElementInList";
import { computed, ref, onBeforeUnmount, onMounted } from "vue";

const action = ref("Build");
const interval = ref<ReturnType<typeof setInterval>>();  
  //ReturnType -specify that the value which will be store here will be the same as returned value from its generic type(setInterval)

const actionClasses = computed(() => {
  return {
    [action.value.toLocaleLowerCase()]: true,
  };
});
const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ["Build", "Create", "Design", "Code"];
    action.value = nextElementInList(actions, action.value);
  }, 1000);
};

onMounted(changeTitle);

onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<style scoped>
.build {
  color: blue;
}
.create {
  color: green;
}
.design {
  color: orange;
}
.code {
  color: red;
}
</style>
