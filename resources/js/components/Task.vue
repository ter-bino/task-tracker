<template>
    <div class="bg-white text-gray-500 shadow-md rounded-lg p-4 sm:max-w-2xl md:max-w-4xl mx-auto">
        <div class="border-b-4 border-red-200 text-center font-bold">
            <h1>TASK INFORMATION</h1>
        </div>
        <div class="flex flex-col p-4">
            <div class="mb-2">
                <span class="border-l-4 border-red-200 pr-4 pl-1 font-bold">Title:</span>
                <p class="mx-4">
                    {{ task.title }}
                </p>
            </div>
            <div class="mb-2">
                <span class="border-l-4 border-red-200 pr-4 pl-1 font-bold">Description:</span>
                <br>
                <p class="mx-4 text-justify whitespace-pre-line">
                    {{ task.description }}
                </p>
            </div>
            <div class="mb-2">
                <span class="border-l-4 border-red-200 pr-4 pl-1 font-bold">Deadline:</span>
                <br>
                <p class="mx-4">
                    {{ formattedDeadline(task.deadline) }}
                </p>
            </div>
            <div v-if="task.isImportant || task.isCompleted">
                <span class="border-l-4 border-red-200 pr-4 pl-1 font-bold">Additonal Notes:</span>
                <div v-if="task.isImportant" class="flex flex-row my-4 items-center">
                    <span class="font-bold text-xl text-white h-6 w-6 bg-red-500 rounded-full text-center">!</span>
                    <p class="mx-4">
                        This task is marked as important
                    </p>
                </div>
                <div v-if="task.isCompleted" class="flex flex-row my-4 items-center">
                    <span class="font-bold text-xl text-white h-6 w-6 bg-green-500 rounded-full text-center">✓</span>
                    <p class="mx-4">
                        This task is marked as completed
                    </p>
                </div>
            </div>
            <div class="flex justify-end">
                <router-link to="/" type="button" class="mx-2 px-2 py-1 border rounded-lg text-white bg-red-400">CLOSE</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            task: {},
        }
    },

    async created() {
        try {
            const response = await axios.get(`/api/tasks/${this.$route.params.id}`);
            this.task = {...response.data, isImportant: response.data.isImportant===1? true: false,  isCompleted: response.data.isCompleted===1? true: false};
            console.log(this.task);
        } catch (error) {
            //alert('Failed to fetch task information.')
            console.error(error)
        }
    },

    methods: {
        formattedDeadline: (deadline) =>{
            const options = { month: 'long' , day: 'numeric', year: 'numeric'};
            return new Date(deadline).toLocaleString(undefined, options);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>