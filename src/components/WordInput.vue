<script lang="ts">
import { ref } from 'vue'

const word = ref('')
</script>

<template>
  <div class="word-input-container">
    <input
      v-model="word"
      type="text"
      @keyup.enter="submitWord"
      class="word-input"
      placeholder="Słowo dnia"
    />
    <!-- <button @click="submitWord" class="submit-button" :style="{ opacity: word ? '100%' : '0%' }">
      Submit
    </button> -->
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
  transition: border-color 0.3s;
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
</style>
