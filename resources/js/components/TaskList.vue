<template>
    <div>
      <div v-for="task in tasks" :key="task.id" class="mb-3">
        <TaskItem :id="task.id" :title="task.title" :description="task.description" :deadline="new Date(task.deadline)" :isImportant="task.isImportant===1? true: false" :isCompleted="task.isCompleted===1? true: false"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import TaskItem from './TaskItem.vue';
  import axios from 'axios';
  import { ref } from 'vue';
  
  const tasks = ref([]);
  
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      tasks.value = response.data;
    } catch (error) {
      alert("Unable to fetch tasks.");
    }
  };
  
  fetchTasks();
  </script>
  
  <script>
  export default {
    name: 'TaskList',
    components: {
      TaskItem,
    },
    data() {
      return {
        tasks: [],
      };
    },
    methods: {
      async deleteTask(id) {
        try {
          await axios.delete(`api/tasks/${id}`);
          this.tasks = this.tasks.filter((task) => task.id !== id);
        } catch (error) {
          alert('Failed to delete task!');
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  