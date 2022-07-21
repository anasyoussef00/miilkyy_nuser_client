<script lang="ts" setup>
import {reactive,ref} from 'vue';
import {useStore} from 'vuex';

import Inuse from '@/store/interfaces/Inuse';

import Swal from 'sweetalert2';

import Api from '@/api/Api';

const store = useStore();

const formData: Inuse = reactive({
  title: '',
  body: '',
  location: '',
  happened_at: new Date()
});

const errors = ref({});
const error_message = ref('');

const postNuse = async () => {
  const closeBtn = document.getElementById("closeBtn");
  try {
    await Api.post('/nuse/create', formData, {
      headers: {
        'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
      }
    });
    closeBtn?.click();
    formData.title = "";
    formData.body = "";
    formData.location = "";
    formData.happened_at = new Date();
    store.dispatch('nuse/GET_LIST_OF_NUSE');
  } catch(err: any) {
    errors.value = err.response.data.errors;
    error_message.value = err.response.data.message;
    Swal.fire({
      title: 'Oops..!',
      text: error_message.value,
      icon: 'error',
      toast: true,
      position: 'bottom'
    });
  }
}
</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#nuseModal">
    Got any nuse? Post some <span class="fw-bold">+</span>
  </button>

  <!-- Modal -->
  <div class="modal fade" id="nuseModal" tabindex="-1" aria-labelledby="nuseModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="nuseModalLabel">Post some nuse</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form method="POST">
            <div class="mb-3">
              <label class="form-label" for="title-field">Title</label>
              <input v-model="formData.title" class="form-control" type="text" id="title-field" name="title-field" placeholder="e.g. Florida man fights an aligator">
              <span v-for="(error, index) in errors.title" :key="index" class="text-danger">{{error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="body-field">Body</label>
              <textarea v-model="formData.body" class="form-control" type="text" id="body-field" name="body-field" rows="5" placeholder="e.g. Florida man fights an aligator bla bla bla bla...."></textarea>
              <span v-for="(error, index) in errors.body" :key="index" class="text-danger">{{error}}</span>
            </div>
            <div class="mb-3">
              <label class="form-label" for="location-field">Location</label>
              <input v-model="formData.location" class="form-control" type="text" id="location-field" name="location-field-field" placeholder="e.g. New York">
              <span v-for="(error, index) in errors.location" :key="index" class="text-danger">{{error}}</span>
            </div>
            <div>
              <label class="form-label" for="happened-at-field">Happened at</label>
              <input v-model="formData.happened_at" class="form-control" type="date" id="happened-at-field" name="happened-at-field">
              <span v-for="(error, index) in errors.happened_at" :key="index" class="text-danger">{{error}}</span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="closeBtn" data-bs-dismiss="modal">Close</button>
          <button @click="postNuse" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>