<script setup lang="ts">
import WordInput from './components/WordInput.vue'

const today = new Date().toLocaleDateString('pl-PL', {
  month: 'long',
  day: '2-digit',
})

const weekDay = new Date().toLocaleDateString('pl-PL', {
  weekday: 'long',
})

const showHistoric = () => {
  console.log('Historyczne słowa dnia')
}
</script>

<template>
  <header>
    <h1>
      Słowo dnia - <span class="weekday">{{ weekDay }}</span
      >, {{ today }}
    </h1>
  </header>
  <main>
    <WordInput />
  </main>
  <footer>
    <a @click="showHistoric">Historyczne słowa dnia</a>
  </footer>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 20px;
}

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

.weekday {
  color: #ff6f2f;
  font-weight: bold;
}
</style>
