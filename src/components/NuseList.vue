<script lang="ts" setup>
import CreateNuseForm from '@/components/CreateNuseForm.vue';

import {reactive,Ref,ref,computed,onBeforeMount} from 'vue';
import {useStore} from 'vuex';
import {Router,useRouter} from 'vue-router';

const store = useStore();
const router: Router = useRouter();

// const formData = reactive({
//   title: '',
//   body: '',
//   location: '',
//   happened_at: ''
// });

const nuser_ID = computed(() => store.getters['authentication/NUSER_OBJ'].id);

const allNuse: Ref<any[]> = ref([]);
const nuseList = computed({
  get() {
    return allNuse.value = store.getters['nuse/GET_NUSE_LIST'];
  },
  set(newVal: any) {
    allNuse.value = newVal;
  }
});
// const likesArray: Ref<any[]> = ref([]);

// const anotherLikesArray: Ref<any[]> = ref([]);

// const isLikedByMe: Ref<boolean> = ref(false);
// const is_liked_by_user: Ref<boolean> = ref(false);

onBeforeMount(() => {
  try {
    store.dispatch('nuse/GET_LIST_OF_NUSE');
    // const {data} = await Api.get('nuse/all', {
    //   headers: {
    //     'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
    //   }
    // });
    // allNuse.value = data;
    // for(let i = 0; i < allNuse.value.length; i++) {
    //   nuse = allNuse.value[i];
    //   for(let i = 0; i < nuse.length; i++) {
    //     likes = nuse.likes[i];
    //     console.log(likes);
    //   }
    // }
    // for (let nuse in allNuse.value) {
    //   for (let likes in (nuse as any).likes) {
    //     // console.log(likes);
    //     likesArray.value.push(likes);
    //   }
    // } 
    // console.log(likesArray.value.includes(`user_id: ${nuser_ID.value}`));
    // for(let like of likesArray.value) {
    //   Object.keys(like).forEach((key: string) => {
    //   if (like['user_id'] === nuser_ID.value) {
    //       // console.log(like['user_id']);
    //     }
    //   });
    // }

    // isLikedByMe.value = !!likesArray.value.find(like => like.user_id === nuser_ID.value);
  } catch(err: any) {
    console.error(err);
  }
});
// const filterLikedArray = (likes_array: any[]): any => {
//   // return console.log();
//   likes_array.forEach(like => {
//     console.log(like);
//   });
// }

// const check_is_nuse_liked_by_me = (nuseId: number) => {
//   return isLikedByMe.value == !!likesArray.value.find(nuse => nuse.nuse_id === nuseId);
//   likesArray.value.forEach(like => {
//     return isLikedByMe.value == !!likesArray.value.find(nuse => nuse.nuse_id === nuseId && like.user_id === nuser_ID.value);
//   });
//   // filterLikedArray(likesArray.value);
// }

const handleDelete = (nuseId: number) => {
  try {
    store.dispatch('nuse/DELETE_NUSE', nuseId);
  } catch(err: any) {
    console.error(err);
  }
}

const viewNuse = (nuseId: number) => {
  router.push({
    name: 'view',
    params: {
      nuse_id: nuseId
    }
  });
}
// const testLike = async (nuseId: number) => {
//   try {
//     const {data} = await Api.get(`nuse/test/${nuseId}`, {
//       headers: {
//         'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
//       }
//     });
//     return data;
//   } catch(err) {
//     console.error(err);
//   }
// }

// const handleLike = async (nuseId: number) => {
//   const likeTest = await testLike(nuseId);
//   console.log("like test", likeTest);
//   if(likeTest) {
//     try {
//       const {data} = await Api.post(`unlike/${nuseId}`, {}, {
//         headers: {
//           'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
//         }
//       });
//       // likesArray.value = likesArray.value.splice(nuseId, 1);
//       // likesArray.value.forEach(like => {
//       const foundLikeOrSomethingIdkAnymore = likesArray.value.find(foundLike => foundLike.nuse_id === nuseId);
//       console.log("the found", foundLikeOrSomethingIdkAnymore);
//       likesArray.value.splice(foundLikeOrSomethingIdkAnymore, 1);
//       // });
//       check_is_nuse_liked_by_me(nuseId);
//       // isLikedByMe.value = true;
//     } catch(err: any) {
//       console.error(err);
//     }
//   } else {
//     try {
//       const {data} = await Api.post(`like/${nuseId}`, {}, {
//         headers: {
//           'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
//         }
//       });
//       likesArray.value.push(data);
//       check_is_nuse_liked_by_me(nuseId);
//     } catch(err: any) {
//       console.error(err);
//     }
//   }
// }
</script>

<template>
  <div v-if="nuseList.length === 0">
    <div class="min-vh-100 d-flex justify-content-center align-items-center">
      <section class="d-flex justify-content-center mb-3">
        <create-nuse-form/>
      </section>
    </div>
  </div>
  <div v-else>
    <section class="d-flex justify-content-center mb-3">
      <create-nuse-form/>
    </section>
    <!-- <main>
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
                <p @click="handleDelete(nuse.id)" class="delete text-danger d-flex justify-content-end m-0">Delete</p>
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
                <button class="btn btn-danger me-3" type="button"><i class="fa-solid fa-heart"></i></button>
                <button class="btn btn-primary" type="button"><i class="fa-solid fa-comment"></i></button>
              </div>
              <div class="d-flex">
                <button class="btn btn-outline-primary" type="button"><i class="fa-solid fa-bookmark"></i> Bookmark</button>
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
    </main> -->
    <main class="row">
      <div v-for="nuse in nuseList" :key="nuse.id" class="card mx-3 mb-3 px-0" style="width: 20.8rem; height: 17rem;">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title">{{nuse.title}}</h5>
            <div v-if="nuse.user_id === nuser_ID">
              <i @click="handleDelete(nuse.id)" class="fa-solid fa-trash text-danger icon" style="font-size: 1.3rem;"></i>
            </div>
          </div>
          <h6 style="display: inline;">{{nuse.user.nusername}}</h6>&nbsp;&#9658;
          <h6 class="card-subtitle mb-2" style="display: inline;"><router-link class="link-secondary" id="read-more" :to="{name: 'view', params: {nuse_id: nuse.id}}">{{new Date(nuse.created_at).toDateString()}}</router-link></h6>
          <p class="card-text">
            {{nuse.body.slice(0, 200)}}<span v-if="nuse.body.trim().length >= 200">&nbsp;&#9658;<router-link class="link-primary" id="read-more" :to="{name: 'view', params: {nuse_id: nuse.id}}">View full nuse...</router-link></span>
          </p>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <i class="far fa-heart text-danger me-2 icon" style="font-size: 1.4rem;"></i>
              <i class="fa-solid fa-comment text-primary icon" style="font-size: 1.4rem;"></i>
            </div>
            <div class="d-flex">
              <i class="far fa-bookmark text-primary icon" style="font-size: 1.4rem;"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.icon {
  cursor: pointer;
}

/*.edit {
  cursor: pointer;
}

.edit:hover {
  text-decoration: underline;
}*/

.card:hover {
  box-shadow: 1px 1px 7px 1px #777777;
}
</style>