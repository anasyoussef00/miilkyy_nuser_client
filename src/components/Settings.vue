<script lang="ts" setup>
import {reactive,Ref,ref,computed,onBeforeMount,onMounted} from 'vue';
import {Store,useStore} from 'vuex';
import {Router,useRouter} from 'vue-router';

import Api from '@/api/Api';

const store = useStore();
const router: Router = useRouter();

const nuser_ID = computed(() => store.getters['authentication/NUSER_OBJ'].id);
const firstName = computed(() => store.getters['authentication/NUSER_OBJ'].first_name);
const lastName = computed(() => store.getters['authentication/NUSER_OBJ'].last_name);
const nusername = computed(() => store.getters['authentication/NUSER_OBJ'].nusername);
const email = computed(() => store.getters['authentication/NUSER_OBJ'].email);
const birthdate = computed(() => store.getters['authentication/NUSER_OBJ'].birthdate);

const formData = reactive({
  firstName,
  lastName,
  nusername,
  email,
  password: '',
  birthdate
});

// onMounted(async () => {
//   try {
//     const {data} = await Api.get(`auth/nuser/password/${nuser_ID.value}`);
//     console.log(data);
//   } catch(err: any) {
//     console.error(err);
//   }
// });

const checkIfUserPasswordMatches = async () => {
  try {
    const {data} = await Api.get(`auth/nuser/password/${formData.password}`);
    console.log(data);
  } catch(err: any) {
    console.error(err);
  }
}
</script>

<template>
  <h1 class="text-center">Settings</h1>
  <div class="card">
    <div class="card-body">
      <div class="card-body">
        <form>
          <div class="row mb-3">
            <label for="first-name" class="col-sm-2 col-form-label">First name</label>
            <div class="col-sm-10">
              <input v-model="formData.firstName" type="text" class="form-control" id="first-name" placeholder="e.g. John">
            </div>
          </div>
          <div class="row mb-3">
            <label for="last-name" class="col-sm-2 col-form-label">Last name</label>
            <div class="col-sm-10">
              <input v-model="formData.lastName" type="text" class="form-control" id="last-name" placeholder="e.g. Doe">
            </div>
          </div>
          <div class="row mb-3">
            <label for="nusername" class="col-sm-2 col-form-label">Nusername</label>
            <div class="col-sm-10">
              <input v-model="formData.nusername" type="text" class="form-control" id="nusername" placeholder="e.g. john-182">
            </div>
          </div>
          <div class="row mb-3">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="e.g. johndoe-182@example.com">
            </div>
          </div>
          <div class="row mb-3">
            <label for="curr-password" class="col-sm-2 col-form-label">Current password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="curr-password" placeholder="***************">
            </div>
          </div>
          <div class="row mb-3">
            <label for="new-password" class="col-sm-2 col-form-label">New password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="new-password" placeholder="***************" disabled>
            </div>
          </div>
          <div class="row mb-3">
            <label for="birthdate" class="col-sm-2 col-form-label">Birthdate</label>
            <div class="col-sm-10">
              <input v-model="birthdate" type="date" class="form-control" id="birthdate">
            </div>
          </div>
          <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="genderRadio" id="male" value="male">
                <label class="form-check-label" for="male">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="genderRadio" id="female" value="female">
                <label class="form-check-label" for="female">
                  Female
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="genderRadio" id="other" value="other">
                <label class="form-check-label" for="other">
                  Other
                </label>
              </div>
            </div>
          </fieldset>
          <button type="submit" class="btn btn-success">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</template>