<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator color="white" :height="5"/>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      textContent: `
      let myTheme = localStorage.getItem("theme");
      console.info("my theme on startup:")
      console.info(myTheme)
      if (!myTheme) {
        const isDarkSchemePreferred = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
        myTheme = isDarkSchemePreferred ? 'dark' : 'light';
        localStorage.setItem('theme', myTheme);
      }

      document.documentElement.setAttribute('data-theme', myTheme)
      document.body.style.display = "block"
      `,
      tagPosition: "head",
      type: "text/javascript",
    },
  ],
});
</script>

<style lang="css">
:root {
    
    /* --primary-100:#2cbd83; */
    --primary-100:#d35459;
    /* --primary-200:#d2f9e4; */
    --primary-200:#ffebe8;
    --accent-100:#2C3E50;
    --accent-200:#b4c7dd;

    --success-100: #2cbd83;
    --error-100: #9B1C31;

    --input-border: var(--color-grey-dark-1);
    --input-focus-h: 245;
    --input-focus-s: 100%;
    --input-focus-l: 42%;

    /* actual color tokens
    --bg-100: #000000;
    --bg-200:#141414;
    --bg-300:#404040;
    --bg-100: red; */
    --text-white:#FDF2FA;
    --text-black:#273440;
    --text-over-primary: #ffffff;
    --text-over-danger: #ffffff;
}

:root, html[data-theme="light"] {
    --bg-100: #f8faf9;
    --bg-200: #f8fafc;
    --bg-300:#adadad;

    --border-100: #e2e8f0;
    --border-200: #9a9a9a;

    --text-100: var(--text-black);

    --shadow-100: #141414;

    --secondary-100: #edeff2;
    --text-over-secondary: var(--text-100);
}

html[data-theme="dark"] {
    --bg-100: #000000;
    --bg-200:#141414;
    --bg-300:#404040;

    --border-100: #202020;
    --border-200: #9a9a9a;

    --text-100: var(--text-white);
    --text-over-secondary: #e0e0e0;

    --shadow-100: #585858;

    --secondary-100: #404040;
}

/* VueForm overrides */
:root, :before, :after, * {
  --vf-border-color-input: var(--border-100) !important;
  --vf-bg-input: var(--bg-100) !important;
  --vf-color-input: var(--text-100) !important;
  --vf-primary: var(--primary-100) !important;
  --vf-primary-darker: var(--primary-100) !important;
  --vf-bg-selected: var(--bg-200) !important;
  --vf-ring-width: 0px !important;
}

a {
    text-decoration: none;
}

a:link, a:visited {
    color: var(--color-font-light);
}


body {
  /* font-family: "Roboto", sans-serif; */
  display: none;
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-100);
  background-color: var(--bg-100);
  touch-action: pan-x pan-y;
}

.page {
  width: min(100% - .7rem, 960px);
  margin-inline: auto;
}

.icon {
  display: inline-block;
}

* {
  margin: 0;
  padding: 0;
  font: inherit;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    font-family: sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

hr {
  border-bottom: none;
  margin-block: 1.5rem;
  border-color: var(--border-200);
}

.content {
  background-color: var(--bg-100);
}

.content h1 {
  font-size: 2.5rem;
  line-height: 2.5rem;
  margin-bottom: .5rem;
  text-transform: uppercase;
}


.content blockquote {
  background-color: var(--bg-200);
  padding: 1.5rem;
  margin-block: 1rem;
  border: 1px solid var(--border-100);
  /* box-shadow: 0 10px 20px -12px var(--border-100); */
  border-radius: .3rem;
}

.content strong {
  font-weight: 600;
}

.content h3 {
  font-size: 1.5rem;
  text-transform: uppercase;
}

.content ol, .content ul {
  margin: 0;
  padding: 0;
  padding-left: 0;
}

.content ol {
  list-style: none;
  list-style-position: outside
}

.content ul {
  padding-left: 2.5rem;
}

.content ol li {
  margin-block: 1rem;
}

/* .content li::marker {
  font-weight: 500;
  font-size: 1.5rem;
  font-family: monospace;
} */

.content ol li::before {
  content: counter(list-item);
  font-weight: 500;
  font-size: 1.2rem;
  padding: .5rem;
  display: grid;
  align-content: center;
  width: fit-content;
  margin-bottom: .5rem;
  height: 3rem;
  text-align: center;
  aspect-ratio: 1;
  border-bottom: 2px solid var(--border-200);
  color: var(--border-200);
}

.content a {
  text-decoration: underline;
  color: var(--primary-100);
}

</style>