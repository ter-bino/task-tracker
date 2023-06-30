<template>
    <div>
      <span v-if="data.data.length>0">
        <Pager :totalPages="data.last_page" :totalItems="data.total" :pageJump="fetchData"/>
        <div v-for="task in data.data" :key="task.id" class="mb-3">
          <TaskItem :id="task.id" :title="task.title" :description="task.description" :deadline="new Date(task.deadline)" :isImportant="task.isImportant===1? true: false" :isCompleted="task.isCompleted===1? true: false" :delete="deleteTask"/>
        </div>
      </span>
      <div v-else class="bg-gray-300 h-64 flex justify-center items-center rounded-2xl">
          <div class="text-center text-4xl text-gray-500">NO TASKS TO TRACK</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import TaskItem from './TaskItem.vue';
  import Pager from './Pager.vue';
  import axios from 'axios';
  import { ref } from 'vue';
  
  const data = ref([]);
  
  const fetchData = async (itemPerPage, page) => {
    try {
      const response = await axios.get(route('tasks.index') + `/?itemPerPage=${itemPerPage? itemPerPage:5}&page=${page? page:1}`);
      data.value = response.data;
    } catch (error) {
      console.error(error);
      alert("Unable to fetch tasks.");
    }
  };

  fetchData();
  </script>
  
  <script>
  export default {
    name: 'TaskList',
    components: {
      TaskItem,
    },
    data() {
      return {
        data: [],
      };
    },
    methods: {
      async deleteTask(id) {
        try {
          await axios.delete(`api/tasks/${id}`);
          this.data.data = this.data.data.filter((task) => task.id !== id);
        } catch (error) {
          alert('Failed to delete task!');
        }
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  