<template>
  <ui-card class="mx-auto card">
    <form class="form-wrapper-form" @submit.prevent="onLogin">
      <img src="/favicon.ico" alt="app_logo">
      <h1 class="text-2xl uppercase">Nuxt App</h1>
      <div class="flex flex-col gap-2 my-10">
        <input class="" placeholder="username" v-model="username" type="text" :required="true" />
        <input class="" placeholder="password" v-model="password" type="password" :required="true" />
        <span class="flex items-center">
          <input type="checkbox" checked disabled>
          <span class="ml-2">keep logged in</span>
        </span>
      </div>
      <ui-button :loading="loading" icon="i-hugeicons-login-01" color="primary">login</ui-button>
      </form>
      <div class="flex flex-col items-center mt-5">
        <span>or</span>
        <ui-button class="underline" link @click="navigateTo({ path: '/' });">continue without login</ui-button>
      </div>
  </ui-card>
</template>
<script setup lang="ts">
const { loading, login, clear } = useLogin();
const username = ref<string>("");
const usernameInput = ref<HTMLInputElement | null>(null);
const password = ref<string>("");
const passwordInput = ref<HTMLInputElement | null>(null);

const onLogin = async () => {
  await login(username.value, password.value);
  navigateTo({ path: "/" });
};

onMounted(() => {
  clear();
  [usernameInput, passwordInput].forEach((_ref) => {
    _ref.value?.addEventListener("focus", () => {
      document.querySelector(`[for='${_ref.value?.id}']`)?.classList?.add("active");
    });

    _ref.value?.addEventListener("focusout", () => {
      if (!_ref.value?.value) {
        document.querySelector(`[for='${_ref.value?.id}']`)?.classList?.remove("active");
      }
    });
  });
});
</script>
<style lang="css" scoped>
.form-wrapper-form {
  max-width: 30rem;
  margin-inline: auto;
  margin-block: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  padding: 0.3rem .5rem;
  border-radius: .3rem;
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px var(--bg-200) inset !important;
    -webkit-text-fill-color: var(--color-font-light);
}

.card {
  width: min(460px, 100%);
  margin-top: 2rem;
  padding: 4rem;
}
</style>
