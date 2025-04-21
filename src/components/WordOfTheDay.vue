<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import loadingSvg from '@/assets/90-ring.svg'

const word = ref('')

onMounted(() => {
  fetchWordOfTheDay()
})

const fetchWordOfTheDay = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/api/get')
    const data = response.data
    if (data && data.word) {
      word.value = data.word
    } else {
      word.value = 'Brak słowa dnia'
    }
  } catch (error) {
    word.value = 'Błąd serwera'
    console.error('Error fetching word of the day:', error)
  }
}
</script>

<template>
  <div>
    <h1>{{ word }}</h1>
    <div v-if="word === ''" class="loading-overlay">
      <img :src="loadingSvg" alt="Loading..." />
    </div>
  </div>
</template>

<style lang="css" scoped>
h1 {
  text-align: center;
  font-weight: bold;
  font-size: 6rem;
  margin-top: -20px;
}

.loading-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.loading-overlay img {
  width: 50px;
  height: 50px;
}
</style>
