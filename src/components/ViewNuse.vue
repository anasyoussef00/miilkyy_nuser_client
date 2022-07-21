<script lang="ts" setup>
import {Ref,ref,onBeforeMount,computed} from 'vue';
import {Router,useRoute} from 'vue-router';
import {Store,useStore} from 'vuex';

import Api from '@/api/Api';

const route = useRoute();
const store = useStore();

// const nuser_ID = computed(() => store.getters['authentication/NUSER_OBJ'].id);

const nuse_id: Ref<string | string[]> = ref('');

const nuse = ref({});

onBeforeMount(async () => {
  nuse_id.value = route.params.nuse_id;
  try {
    const {data} = await Api.get(`nuse/${nuse_id.value}`, {
      headers: {
        'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
      }
    });
    nuse.value = data;
  } catch(err) {
    console.error(err);
  }
});

// const handleLike = async (nuseId: number) => {
//   try {
//     const {data} = await Api.post(`like/${nuseId}`, {}, {
//       headers: {
//         'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
//       }
//     });
//   } catch(err: any) {
//     console.error(err);
//   }
// }
</script>

<template>
  <main>
    <div class="card mb-2 border border-secondary">
      <div class="card-header">
        <div class="row">
          <p class="col-md-3 m-0 text-break"><strong>{{nuse.title}}</strong></p>
          <div class="col-md-6">
            <a href="#">{{new Date(nuse.created_at).toDateString()}}</a>&nbsp;&#9658;
            <p class="text-muted" style="display:inline;">{{nuse.id}}</p>
          </div>
           <div class="col-md-3">
            <div>
              <p class="delete text-danger d-flex justify-content-end m-0">Delete</p>
            </div>
          </div>        
        </div>
      </div>
      <div class="row g-0">
        <div class="card-body col-md-1">
          <p>Posted by: <strong>{{nuse.user.first_name}}&nbsp;{{nuse.user.last_name}}(<a href="#">@{{nuse.user.nusername}}</a>)</strong><p style="display:inline;">[{{nuse.user_id}}]</p></p>
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
              <button @click="handleLike(nuse.id)" class="btn btn-outline-primary me-3" type="button"><i class="fa-solid fa-thumbs-up"></i></button>
              <button class="btn btn-primary" type="button"><i class="fa-solid fa-comment"></i></button>
            </div>
            <div class="d-flex">
              <button class="btn btn-outline-primary" type="button"><i class="fa-solid fa-bookmark"></i> Bookmark</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>