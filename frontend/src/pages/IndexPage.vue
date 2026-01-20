<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Full-Stack Demo</div>

    <!-- Existing sections (Git/Docker static) -->
    <!-- ... (จากตัวอย่างก่อน) -->

    <!-- New: API Data -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Data from Backend</div>
        <q-spinner v-if="loading" color="primary" size="2em" />
        <q-list v-else bordered separator>
          <q-item>
            <q-item-label>Git: {{ apiData.git.detail }}</q-item-label>
          </q-item>
          <q-item>
            <q-item-label>Docker: {{ apiData.docker.detail }}</q-item-label>
          </q-item>
        </q-list>
        <q-btn v-if="!loading" color="primary" @click="fetchData">Refresh</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Existing data (gitSteps, dockerItems)
// ...

const apiData = ref({ git: {}, docker: {} });
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/demo`);
    apiData.value = response.data;
  } catch (error) {
    console.error('API Error:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>