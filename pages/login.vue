<template>
  <ui-card flat class="mx-auto">
    <div class="form-wrapper-form">
    <img src="/favicon.ico" alt="app_logo" width="64px"/>
    <h1 class="text-2xl uppercase font-title text-6xl">Chef</h1>
    <div class="flex flex-col gap-2 my-10">
      <client-only>
        <Vueform
          ref="form$"
          size="lg"
          :display-errors="false"
          :endpoint="false"
          @submit="async () => await onLogin()"
        >
          <TextElement
            name="username"
            placeholder="Username"
            default="chef"
            :rules="['required']"
          />
          <TextElement
            name="password"
            input-type="password"
            placeholder="Password"
            :rules="['required']"
          />
          <button submit hidden></button>
        </Vueform>
      </client-only>
    </div>
    <ui-button @click="onLogin" :loading="loading" icon="i-hugeicons-login-01" color="primary">login</ui-button
    >
    </div>
    <div class="flex flex-col items-center mt-5">
      <span>or</span>
      <ui-button class="underline" link @click="navigateTo({ path: '/' })"
        >continue without login</ui-button
      >
    </div>
  </ui-card>
</template>
<script setup lang="ts">
import type { VueformElement } from '@vueform/vueform'

interface Login {
  username: string;
  password: string;
}

const { loading, login, clear } = useLogin();

const form$ = ref<null | VueformElement>(null);

const onLogin = async () => {
  if (!form$.value) {
    return
  }
  await form$.value.validate()
  if (!form$.value.hasErrors) {
    const data = form$.value.data as Login;
    await login(data.username, data.password);
    navigateTo({ path: "/" });
  }
};


useHead({
  title: "Chef | Login",
})
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
