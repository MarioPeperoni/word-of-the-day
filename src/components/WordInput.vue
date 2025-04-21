<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import loadingSvg from '@/assets/90-ring.svg'

import { wordSchema } from '@/schemas'
// import { getCookie } from '@/utils/cookie'

const inputtedWord = ref('')
const submittedWord = ref('')

const shake = ref(false)
const submitting = ref(false)

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})

// onMounted(() => {
//   const cookie = getCookie('submittedWord')
//   submittedWord.value = cookie || ''
// })

const submitWord = async () => {
  submitting.value = true
  const value = inputtedWord.value.trim()
  const validation = wordSchema.safeParse(inputtedWord.value)

  if (!validation.success) {
    shakeEffect()
    submitting.value = false
    return
  }

  try {
    await axios.post(
      'http://127.0.0.1:3000/api/submit',
      { word: value },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    submittedWord.value = value
  } catch (error) {
    submitting.value = false
    shakeEffect()
  } finally {
    submitting.value = false
  }
}

const shakeEffect = () => {
  shake.value = true
  setTimeout(() => {
    shake.value = false
  }, 500)
}
</script>

<template>
  <div class="input-wrapper">
    <input
      ref="inputRef"
      v-model="inputtedWord"
      type="text"
      @keyup.enter="submitWord"
      :class="['word-input', { shake, submitting }]"
      :disabled="submitting"
      placeholder="Słowo dnia"
    />
    <div v-if="submitting" class="loading-overlay">
      <img :src="loadingSvg" alt="Loading..." />
    </div>
  </div>
</template>

<style scoped>
.word-input {
  width: 100%;
  padding: 20px 10px;
  font-size: 80px;
  border: none;
  border-bottom: 2px solid #ffffff;
  background-color: transparent;
  text-align: center;
  color: white;
  font-weight: bold;
  transition: all 0.3s;
}

.word-input:focus {
  border-color: #ff6f2f;
  outline: none;
}

.word-input:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.input-wrapper {
  position: relative;
}
</style>

<style lang="css" scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.word-input.shake {
  animation: shake 0.5s ease-in-out;
  border-color: rgb(230, 64, 64);
  color: rgb(230, 64, 64);
}
</style>

<style lang="css" scoped>
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
