<script setup lang="ts">
const today = new Date().toLocaleDateString('pl-PL', {
  month: 'long',
  day: '2-digit',
})

const weekDay = new Date().toLocaleDateString('pl-PL', {
  weekday: 'long',
})
</script>

<template>
  <header>
    <h1>
      Słowo dnia - <span class="weekday">{{ weekDay }}</span
      >, {{ today }}
    </h1>
  </header>
</template>

<style lang="css" scoped>
header {
  text-align: center;
  margin-bottom: 20px;
}
.weekday {
  color: #ff6f2f;
  font-weight: bold;
}
</style>
