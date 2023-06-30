<template>
    <div :class="['shadow-lg', 'rounded-2xl', 'p-4', 'flex', (needsAttention && !isCompleted) ? 'bg-red-200': 'bg-white']">
        <router-link :to="viewLink"  class="flex-grow">
            <h1 class="font-bold truncate">
                {{title}}
                <span v-if="isCompleted" class="text-white px-2 bg-green-500 rounded-full">✓</span>
                <span v-else-if="isImportant" class="text-white px-2 bg-red-500 rounded-full">!</span>
            </h1>
            <p class="text-sm">{{ formattedDeadline }}</p>
            <p>{{ shortenedDescription }}</p>
        </router-link>
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

    const viewLink = computed(() => {
        return `/tasks/${props.id.toString()}`;
    })

    const editLink = computed(() => {
        return `/tasks/${props.id.toString()}/edit`;
    })
    
    const shortenedDescription = computed(() => {
        if(props.description.length > 40) {
            return props.description.slice(0, 40) + "...";
        } else {
            return props.description;
        }
    })

    const needsAttention = computed(() => {
        const deadlineDate = new Date(props.deadline);
        const currentDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() - 1);
        
        return currentDate >= deadlineDate;
    })
</script>

<style lang="scss" scoped>

</style>