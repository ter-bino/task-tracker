<template>
    <div class="bg-white shadow-md rounded-lg p-4 sm:max-w-2xl md:max-w-4xl mx-auto">
        <div class="border-b-4 border-red-200 text-center font-bold text-gray-500">
            <h1 v-if="isNewTask">NEW TASK</h1>
            <h1 v-else>Edit Task</h1>
        </div>
        <form @submit.prevent="submitForm" class="flex flex-col p-4">
            <div class="flex flex-col mb-5">
                <label for="name" class="w-full text-gray-500 ">Title:</label>
                <input type="text" id="name" v-model="task.title" class="border-b flex-grow border-gray-400 focus:outline-none text-gray-700" required />
            </div>
            <div class="flex flex-col mb-5">
                <label for="description" class="w-full text-gray-500">Description:</label>
                <textarea id="description" v-model="task.description" class="border flex-grow border-gray-400 focus:outline-none text-gray-700" required></textarea>
            </div>
            <div class="flex flex-col mb-5">
                <label for="deadline" class="w-full text-gray-500">Deadline:</label>
                <input type="date" id="deadline" v-model="task.deadline"  class="border flex-grow border-gray-400 focus:outline-none text-gray-700" required />
            </div>
            <div class="flex flex-row mb-5 justify-around">
                <div>
                    <label for="important" class="text-gray-500">Important? </label>
                    <input type="checkbox" id="important" v-model="task.isImportant" class="border border-gray-400 focus:outline-none text-gray-700" />
                </div>
                <div v-if="!isNewTask">
                    <label for="completed" class="text-gray-500">Completed? </label>
                    <input type="checkbox" id="completed" v-model="task.isCompleted" class="border border-gray-400 focus:outline-none text-gray-700" />
                </div>
            </div>
            <div class="flex justify-center">
                <button v-if="isNewTask" type="submit" class="p-1 border border-green-200">Add Task</button>
                <button v-else type="submit" class="p-1 border border-green-200">Update Task</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            task: {
                title: '',
                description: '',
                deadline: Date.undefined,
                isImportant: false,
                isCompleted: false
            }
        }
    },
    computed: {
        isNewTask() {
            return !this.$route.path.includes('edit');
        }
    },
    async created() {
        if(!this.isNewTask) {
            const response = await axios.get(`/api/tasks/${this.$route.params.id}`);
            this.task = {...response.data,
                            isCompleted:response.data.isCompleted===1? true: false,
                            isImportant: response.data.isImportant===1? true: false
                        };
        }
    },
    methods: {
        async submitForm() {
            try {
                if(this.isNewTask) {
                    await axios.post('/api/tasks/', this.task);
                } else {
                    await axios.put(`/api/tasks/${this.$route.params.id}`, this.task);
                }
                this.clearForm();
            } catch (error) {
                alert('Failed to submit form')
            }
        },
        clearForm() {
            this.task = {
                title: '',
                description: '',
                deadline: '',
                isImportant: false,
                isCompleted: false
            }
        }
    }
}

</script>

<style lang="scss" scoped>

</style>