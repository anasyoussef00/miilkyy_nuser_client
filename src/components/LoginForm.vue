<script lang="ts" setup>
import {reactive,Ref,ref} from 'vue';
import {Store,useStore} from 'vuex';
import {Router,useRouter} from 'vue-router';

import Swal from 'sweetalert2';

import Api from '@/api/Api';

const router: Router = useRouter();
const store = useStore();

const formData = reactive({
  nusername: '',
  password: '',
});

const errors: Ref<Record<string, unknown>> = ref({});

const handleLogin = async () => {
  try {
    store.dispatch('authentication/LOGIN', formData);
    Swal.fire({
      title: "Nice!",
      text: "Your account has been created successfully! :)",
      icon: "success"
    });
    router.push('/');
  } catch(err: any) {
    errors.value = err.response.data.errors;
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
  <section class="d-flex align-items-center justify-content-center min-vh-100">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 mx-auto border p-3">
          <form @submit.prevent="handleLogin" method="POST">
            <h3 class="text-center">Login</h3>
            <div class="mb-3">
              <label class="form-label" for="nusername-field">Nusername</label>
              <input v-model="formData.nusername" class="form-control" id="nusername-field" name="nusername-field" type="text" placeholder="e.g. johndoe-182">
              <span class="text-danger" v-for="(error, index) in errors.nusername" :key="index">{{error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="password-field">Password</label>
              <input v-model="formData.password" class="form-control" id="password-field-field" name="password-field-field" type="password" placeholder="***************">
              <span class="text-danger" v-for="(error, index) in errors.password" :key="index">{{error}}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <button class="btn btn-primary">Submit</button>
              <a href="/auth/register">Don't have an account? Register.</a>
            </div>
          </form>
        </div>
      </div>
    </div>  
  </section>
</template>