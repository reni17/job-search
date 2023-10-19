<template>
    <img
    :src="imageLink"
    class="h-8 rounded-3xl object-contain"
    alt="User profile image"
    />
</template>

<script setup lang="ts">
import { ref } from "vue";

const imageLink = ref("https://cdn-icons-png.flaticon.com/512/3135/3135715.png")

</script>