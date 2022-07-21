<script lang="ts" setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

import Api from '@/api/Api';

const store = useStore();

const nuser_ID = computed(() => store.getters['authentication/NUSER_OBJ'].id);
const nusername = computed(() => store.getters['authentication/NUSER_OBJ'].nusername);

const isLoggedIn = computed(() => store.getters['authentication/TOKEN']);

const handleLogout = async () => {
  try {
    await Api.post('/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${store.getters['authentication/TOKEN']}`
      }
    });
    store.commit("authentication/LOGOUT");
    // store.commit("authentication/SET_NUSER_OBJ", {});
    // store.commit("authentication/SET_TOKEN", "");
  } catch(err) {
    console.error(err);
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top mb-2">
  <div class="container-fluid">
    <a class="navbar-brand" href="/browse">Nuse</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
      </ul> -->
      <form class="navbar-nav d-flex me-auto mb-lg-0" role="search" autocomplete="off">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-success text-light" type="submit">Search</button>
      </form>
      <ul class="d-flex navbar-nav">
        <li v-if="!isLoggedIn" class="nav-item d-flex">
          <a class="nav-link active" aria-current="page" href="/auth/login">Login</a>
          <a class="nav-link active" aria-current="page" href="/auth/register">Register</a>
        </li>
        <li v-else class="nav-item dropdown">
          <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{nusername}}
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" :to="{name: 'profile', params: {nuser_id: nuser_ID}}"><i class="fa-solid fa-user"></i> Profile</router-link></li>
            <!-- <div>
              <div class="accordion" id="profile-accordion">
                <div class="accordion-item">
                  <p class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Profile
                    </button>
                  </p>
                </div>
              </div>
            </div> -->
            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bookmark"></i> Bookmarks</a></li>
            <li><a class="dropdown-item" href="/settings"><i class="fa-solid fa-gears"></i> Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <form @submit.prevent="handleLogout" method="POST">
              <li><button class="dropdown-item" type="submit"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</button></li>
            </form>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>