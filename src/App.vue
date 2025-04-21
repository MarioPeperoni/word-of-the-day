<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getCookie } from './utils/cookie'

import WordInput from './components/WordInput.vue'
import WordOfTheDay from './components/WordOfTheDay.vue'
import Header from './components/Header.vue'

const hasRequestedWord = ref(false)

const showHistoric = () => {
  console.log('Historyczne słowa dnia')
}

onMounted(() => {
  const today = new Date().getDate().toString()
  const cookie = getCookie('submissionDay')

  if (cookie == today) {
    hasRequestedWord.value = true
  }
})
</script>

<template>
  <Header />
  <main>
    <WordOfTheDay v-if="hasRequestedWord" />
    <WordInput v-else />
  </main>
  <footer>
    <a @click="showHistoric">Historyczne słowa dnia</a>
  </footer>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  text-align: center;
  margin-top: 20px;
}

a {
  color: #ff6f2f;
  text-decoration: underline;
  font-size: 16px;
  cursor: pointer;
}
</style>
