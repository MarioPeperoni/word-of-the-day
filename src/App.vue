<script setup lang="ts">
import { onMounted, ref } from 'vue'

import WordInput from './components/WordInput.vue'
import WordOfTheDay from './components/WordOfTheDay.vue'
import Header from './components/Header.vue'

const showInput = ref(true)

const showHistoric = () => {
  console.log('Historyczne słowa dnia')
}

onMounted(() => {
  const hours = new Date().getHours()

  if (hours >= 14) {
    showInput.value = true
  }
})
</script>

<template>
  <Header />
  <main>
    <WordInput v-if="showInput" />
    <WordOfTheDay v-else />
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
