<template>
    <div :class="[{'bg-red-200': needsAttention}, 'bg-white', 'shadow-lg', 'rounded-2xl', 'p-4']">
        <h1 class="font-bold truncate">
            {{title}}
            <span v-if="isCompleted" class="text-white px-2 bg-green-500 rounded-full">✓</span>
            <span v-else-if="isImportant" class="text-white px-2 bg-red-500 rounded-full">!</span>
        </h1>
        <p class="text-sm">{{ formattedDeadline }}</p>
        <p>{{ description }}</p>
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
    });

    const formattedDeadline = computed(() => {
        const options = { month: 'short' , day: 'numeric', year: 'numeric'};
        return new Date(props.deadline).toLocaleString(undefined, options);
    });

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