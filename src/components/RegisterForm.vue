<script lang="ts" setup>
import {reactive,Ref,ref} from 'vue';
import {Store,useStore} from 'vuex';
import {Router,useRouter} from 'vue-router';

import Swal from 'sweetalert2';

import Api from '@/api/Api';

const router: Router = useRouter();
const store = useStore();

const formData = reactive({
  first_name: '',
  last_name: '',
  nusername: '',
  email: '',
  password: '',
  birthdate: ''
});

const confirm_pass_error: Ref<string> = ref('');
const confirm_pass: Ref<string> = ref('');

const errors = ref({});
const errorMessage = ref('');

const handleRegister = () => {
  try {
    // const {data} = await Api.post('/auth/register', formData);
    if(confirm_pass.value.trim() !== formData.password.trim()) {
      confirm_pass_error.value = 'Both passwords should match';
    } else {
      store.dispatch('authentication/REGISTER', formData);
    }
  } catch(err: any) {
    errors.value = err.response.data.errors;
    errorMessage.value = err.response.data.message;
  } 
}
</script>
<template>
  <section class="d-flex align-items-center justify-content-center min-vh-100">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 mx-auto border p-3">
          <form @submit.prevent="handleRegister" method="POST">
            <h3 class="text-center">Register</h3>
            <div class="mb-3">
              <label class="form-label" for="fname-field">First name</label>
              <input v-model="formData.first_name" class="form-control" id="fname-field" name="fname-field" type="text" placeholder="e.g. John">
              <span class="text-danger" v-for="(error, index) in errors.first_name" :key="index">{{error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="lname-field">Last name</label>
              <input v-model="formData.last_name" class="form-control" id="lname-field" name="lname-field" type="text" placeholder="e.g. Doe">
              <span class="text-danger" v-for="(error, index) in errors.last_name" :key="index">{{error}}</span>
            </div>
            <label class="form-label" for="nusername-field">Nusername</label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon">@</span>
              <input v-model="formData.nusername" class="form-control" id="nusername-field" name="nusername-field" type="text" placeholder="e.g. johndoe-182" aria-describedby="basic-addon1">
              <span class="text-danger" v-for="(error, index) in errors.nusername" :key="index">{{error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="email-field">Email address</label>
              <input v-model="formData.email" class="form-control" id="email-field" name="email-field" type="email" placeholder="e.g. johndoe-182@example.com">
              <span class="text-danger" v-for="(error, index) in errors.email" :key="index">{{error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="password-field">Password</label>
              <input v-model="formData.password" class="form-control" id="password-field-field" name="password-field-field" type="password" placeholder="***************">
              <span class="text-danger" v-for="(error, index) in errors.password" :key="index">{{error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="cpassword-field">Confirm password</label>
              <input v-model="confirm_pass" class="form-control" id="cpassword-field-field" name="cpassword-field-field" type="password" placeholder="***************">
              <span class="text-danger">{{confirm_pass_error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="bdate">Birthdate</label>
              <input v-model="formData.birthdate" class="form-control" id="bdate" name="bdate" type="date">
              <span class="text-danger" v-for="(error, index) in errors.birthdate" :key="index">{{error}}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <button class="btn btn-primary">Submit</button>
              <a href="/auth/login">Already got an account? Login.</a>
            </div>
          </form>
        </div>
      </div>
    </div>  
  </section>
</template>