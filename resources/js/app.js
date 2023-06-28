import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'; 

//root component
import App from './App.vue'

//other components
import Task from './components/Task.vue';
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'

//creating router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TaskList },
        { path: '/tasks/create', component: TaskForm },
        { path: '/tasks/:id', component: Task },
        { path: '/tasks/:id/edit', component: TaskForm }
    ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
