<template>
  <input
    type="text"
    :value="modelValue"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>
<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = ($event: Event) => {
  const eventTraget = $event.target as HTMLInputElement;
  emit("update:modelValue", eventTraget.value); //first argument is the name of event, the second is payload
};
</script>
