<template>
    <div class="flex flex-col-nowrap justify-between mb-2 overflow-auto">
        <div class="flex flex-col-nowrap justify-start py-2 bg-gray-300 rounded-full">
            <div v-if="page!=1" class="text-center w-8 mx-1 md:mx-5 cursor-pointer rounded-full bg-gray-400" @click="handlePageJump(page-1)">&lt;</div>
            <div v-else class="text-center w-8 mx-1 md:mx-5 rounded-full bg-gray-100 text-gray-400">&lt;</div>
            <div v-for="i in getPagesToShow()" :class="['text-center', 'w-8', 'mx-1', 'md:mx-5', 'cursor-pointer', 'rounded-full', (i==page? 'bg-blue-400': 'bg-gray-400')]" @click="handlePageJump(i)">
                <span>{{ i }}</span>
            </div>
            <div v-if="page!=totalPages" class="text-center w-8 mx-1 md:mx-5 cursor-pointer rounded-full bg-gray-400" @click="handlePageJump(page+1)">&gt;</div>
            <div v-else class="text-center w-8 mx-1 md:mx-5 rounded-full bg-gray-100 text-gray-400">&gt;</div>
        </div>
        <div class="flex flex-col-nowrap py-2 bg-gray-300 px-4 rounded-full">
            <label for="itemPerPage" class="mr-2 whitespace-nowrap"> Items to show: </label>
            <input @change="handlePageJump(page)" class="bg-gray-400 rounded-md text-center" min="1" max="10" type="number" name="itemPerPage" id="itemPerPage" v-model="itemPerPage"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        totalPages: Number,
        totalItems: Number,
        pageJump: Function
    },
    data() {
        return {
            page: Number,
            itemPerPage: Number,
        }
    },
    async created() {
        this.page = 1;
        this.itemPerPage = 5;
    },
    methods: {
        getPagesToShow() {
            let result = [];

            if(this.totalPages <= 5) {
                for(let i=1; i<=this.totalPages; i++) {
                    result.push(i);
                }
            } else if(this.page <= 3 ) {
                for(let i=1; i <= 5; i++) {
                    result.push(i);
                }
            } else if(this.page >= this.totalPages - 2) {
                for(let i=this.totalPages - 4; i <= this.totalPages; i++) {
                    result.push(i);
                }
            } else {
                for(let i=this.page - 2; i <= this.page + 2; i++) {
                    result.push(i);
                }
            }
            return result;
        },
        handlePageJump(jumpPage) {
            if(this.itemPerPage<1) this.itemPerPage = 1;
            if(this.itemPerPage>10) this.itemPerPage = 10;
            this.pageJump(this.itemPerPage, jumpPage);
            this.page = jumpPage;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>