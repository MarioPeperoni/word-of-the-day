<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import loadingSvg from '@/assets/90-ring.svg'

import { wordSchema } from '@/schemas'

const word = ref('')
const shake = ref(false)
const submitting = ref(false)

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})

const submitWord = async () => {
  submitting.value = true
  const value = word.value.trim()
  const validation = wordSchema.safeParse(word.value)

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
    word.value = ''
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
  <div class="word-input-container">
    <div class="input-wrapper">
      <input
        ref="inputRef"
        v-model="word"
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
  </div>
</template>

<style scoped>
.word-input-container {
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
  padding: 30px;
}

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

.submit-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #ff6f2f;
  font-weight: 600;
}

.submit-button:hover {
  background-color: #fc824e;
}

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

.word-input:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
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
