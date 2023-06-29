<template>
    <div :class="[{'bg-red-200': needsAttention && !isCompleted}, 'bg-white', 'shadow-lg', 'rounded-2xl', 'p-4', 'flex']">
        <div class="flex-grow">
            <h1 class="font-bold truncate">
                {{title}}
                <span v-if="isCompleted" class="text-white px-2 bg-green-500 rounded-full">✓</span>
                <span v-else-if="isImportant" class="text-white px-2 bg-red-500 rounded-full">!</span>
            </h1>
            <p class="text-sm">{{ formattedDeadline }}</p>
            <p>{{ description }}</p>
        </div>
        <div class="flex flex-col md:flex-row">
            <router-link :to="editLink" class="px-2 my-auto md:mx-2 md:w-32 text-center bg-yellow-500 rounded-lg text-white">EDIT</router-link>
            <button @click="()=>props.delete(props.id)" type="button" class="px-2 my-auto md:mx-2 md:w-32 text-center bg-red-500 rounded-lg text-white">DELETE</button>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, computed } from 'vue';

    const props = defineProps({
        id: Number,
        title: String,
        description: String,
        deadline: Date,
        isImportant: Boolean,
        isCompleted: Boolean,
        delete: Function
    });

    const formattedDeadline = computed(() => {
        const options = { month: 'short' , day: 'numeric', year: 'numeric'};
        return new Date(props.deadline).toLocaleString(undefined, options);
    });

    const editLink = computed(() => {
        return `/tasks/${props.id.toString()}/edit`;
    })

    const needsAttention = computed(() => {
        const deadlineDate = new Date(props.deadline);
        const currentDate = new Date();
        const oneDayFromNow = new Date();
        oneDayFromNow.setDate(currentDate.getDate() + 1);

        return deadlineDate <= currentDate || deadlineDate <= oneDayFromNow;
    })
</script>

<style lang="scss" scoped>

</style>