<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container-item">
        <div class="login-center">
          <div class="login-header">
            <div class="login-header-text">Войти</div>
          </div>
          <form @submit="login" class="login-body">
            <div>
              <span>Логин</span>
              <div class="mt-12">
                <input v-model="username" class="login-input" placeholder="Введите логин" type="text">
              </div>
            </div>
            <div class="mt-20">
              <span>Пароль</span>
              <div class="mt-12">
                <input v-model="password" class="login-input login-input-pas" placeholder="************"
                  type="password">
              </div>
            </div>
            <div class="mt-24">
              <button type="submit" class="login-btn">Войти</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <img class="login-img" src="@/assets/img/login-background.png" alt="">
  </div>
</template>
<script setup>
import {useAuthStore} from "~/stores/auth.store";

definePageMeta({
  layout: 'Login',
});

const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const login = (e) => {
  e.preventDefault()
  authStore.login(username.value, password.value)
}
// Variables


</script>

<style scoped>
.login {
  position: relative;
}

.fstyle-14 {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%
}

.login-container-item
{
  display: flex;
  justify-content: center;
  margin-top: 18%;
}

.login-center {
  width: 438px;
  height: 372px;
  background: white;
  border-radius: 8px
}

.login-header {
  background: #FAFDFD;
  height: 68px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom: 1px solid #E1E4E4;
}

.login-header-text {
  padding-left: 40px;
  padding-top: 20px;
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
}

.login-body {
  margin: 24px 40px
}

.mt-12 {
  margin-top: 12px;
}

.mt-20 {
  margin-top: 20px;
}

.mt-24 {
  margin-top: 24px;
}

.login-input {
  width: 100%;
  height: 42px;
  padding-left: 18px;
  background: #FAFDFD;
  border: 1px solid #D2D7D7;
  border-radius: 8px
}

.login-btn {
  width: 100%;
  height: 44px;
  background: #299B9B;
  border-radius: 8px;
  color: white
}

.login-img {
  width: 100vw;
  height: 100vh;
}

.login-input-pas {
  padding-top: 6px;
}
</style>
