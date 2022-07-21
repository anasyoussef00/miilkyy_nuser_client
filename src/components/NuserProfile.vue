<script lang="ts" setup>
import {onBeforeMount,Ref,ref,computed} from 'vue';
import {Router,useRoute} from 'vue-router';
import {useStore} from 'vuex';

import Api from '@/api/Api';
import CreateNuseForm from '@/components/CreateNuseForm.vue';

import Swal from 'sweetalert2';

const route = useRoute();
const store = useStore();

const nuser_ID = computed(() => store.getters['authentication/NUSER_OBJ'].id);

const nuser_id: Ref<string | string[]> = ref('');
const nuseList = ref({});

onBeforeMount(async () => {
  nuser_id.value = route.params.nuser_id;
  try {
    const {data} = await Api.get(`profile/${nuser_id.value}`);
    nuseList.value = data;
  } catch(err) {
    console.error(err);
  }
});

const handleDelete = async (nuseId: number) => {
  try {
    await Api.delete(`nuse/delete/${nuseId}`, {
      headers: {
        'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
      }
    });
    const {data} = await Api.get(`profile/${nuser_id.value}`);
    nuseList.value = data;
    Swal.fire({
      toast: true,
      title: "Nice!",
      text: 'Nuse deleted successfully',
      icon: "success",
      position: "bottom"
    });
  } catch(err: any) {
    Swal.fire({
      toast: true,
      title: "Oops...!",
      text: err.response.data.message,
      icon: "error",
      position: "bottom"
    });
  }
}
</script>

<template>
  <section class="d-flex justify-content-center mb-3">
    <create-nuse-form/>
  </section>
  <main>
    <div v-for="nuse in nuseList" :key="nuse.id" class="card mb-2 border border-secondary">
      <div class="card-header">
        <div class="row">
          <p class="col-md-3 m-0 text-break"><strong>{{nuse.title}}</strong></p>
          <div class="col-md-6">
            <a data-bs-toggle="modal" data-bs-target="#showNuseModal" href="#">{{new Date(nuse.created_at).toDateString()}}</a>&nbsp;&#9658;
            <p class="text-muted" style="display:inline;">{{nuse.id}}</p>&nbsp;&#9658;
            <router-link :to="{name: 'view', params: {nuse_id: nuse.id}}">View nuse</router-link>
          </div>
          <div class="col-md-3">
            <div v-if="nuse.user_id === nuser_ID">
              <i @click="handleDelete(nuse.id)" class="d-flex justify-content-end fa-solid fa-trash text-danger icon" style="font-size: 1.3rem;"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="card-body col-md-1">
          <p>Posted by: <strong>{{nuse.user.first_name}}&nbsp;{{nuse.user.last_name}}(<a href="#">@{{nuse.user.nusername}}</a>)</strong><p style="display: inline;">[{{nuse.user_id}}]</p></p>
          <p>Location: <strong>{{nuse.location}}</strong></p>
          <p>Happened at: <strong>{{nuse.happened_at}}</strong></p>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <p class="card-text text-break">{{nuse.body}}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <i class="far fa-heart text-danger me-2 icon" style="font-size: 1.6rem;"></i>
              <i class="fa-solid fa-comment text-primary icon" style="font-size: 1.6rem;"></i>
            </div>
            <div class="d-flex">
              <i class="far fa-bookmark text-primary icon" style="font-size: 1.6rem;"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="showNuseModal" tabindex="-1" aria-labelledby="showNuseModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="showNuseModal">{{nuse.title}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="closeBtn" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.icon {
  cursor: pointer;
}
</style>