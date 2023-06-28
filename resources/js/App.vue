<template>
    <div>
        <header class="w-full whitespace-nowrap">
            <div class="px-5 md:px-10 lg:px-15 xl:px-25 2xl:px-50 py-4 bg-blue-400 flex justify-between overflow-auto">
                <router-link to="/" class="text-lg md:text-xl font-bold hover:text-blue-800 hover:bg-gray-500 hover:cursor-pointer">
                    [
                    <span class="text-red-800">
                        TASK
                    </span>
                    <span class="text-blue-900">
                        TRACKER!
                    </span>
                    ]
                </router-link>
                <ul class="text-base flex items-center">
                    [
                    <li class="text-white px-2 hover:text-blue-800 hover:cursor-pointer">
                        <router-link to="/">HOME</router-link>
                    </li>
                    ] [
                    <li class="text-white px-2 hover:text-blue-800 hover:cursor-pointer">
                        <router-link to="/tasks/create">CREATE TASK</router-link>
                    </li>
                    ]
                </ul>
            </div>
            <div class="w-full">
                <router-view></router-view>
            </div>
        </header>
    </div>
</template>

<script setup>
</script>

<script>
export default {
    components: {
        name: 'App'
    }
}
</script>

<style lang="scss" scoped>

</style>