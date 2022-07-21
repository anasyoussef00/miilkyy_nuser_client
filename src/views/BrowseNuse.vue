<script lang="ts" setup>
import NuseList from '@/components/NuseList.vue';
import SideBar from '@/components/SideBar.vue';
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="border border-secondary min-vh-100 m-4 p-2">
        <nuse-list/>
      </div>
    </div>
  </div>
</template>

<style>
.bg-gray {
  background-color: gray;
}
</style>