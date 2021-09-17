<template>
    <div class="pagination justify-content-center">
        <a class="page-link" @click="pageMove(currPage-pageBtnSize)">
          <i class="mdi mdi-chevron-double-left"></i>
        </a>
        <a class="page-link" @click="pageMove(currPage-1)">
          <i class="mdi mdi-chevron-left"></i>
        </a>
        <div class="page-item" v-for="(item, idx) of pageList" :key="idx">
            <a :class="{'bg-success text-white': item==currPage}" class="page-link" @click="pageMove(item)">{{item}}</a>
        </div>
        <a class="page-link" @click="pageMove(currPage+1)">
          <i class="mdi mdi-chevron-right"></i>
        </a>
        <a class="page-link" @click="pageMove(currPage+pageBtnSize)">
          <i class="mdi mdi-chevron-double-right"></i>
        </a>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        totalPage: {
            type: Number,
            default: 1
        },
        currPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 1
        },
        pageBtnSize: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            startPage: this.currPage,
            lastPage: Math.floor(this.totalPage / this.pageSize) + (this.totalPage % this.pageSize),
            pageList: []
        }
    },
    methods: {
        init() {
            this.pageList = []

            let loadPage = this.startPage + this.pageBtnSize
            for (let i=this.startPage;i<loadPage&&i<=this.lastPage;i++) {
                this.pageList.push(i)
            }
        },

        pageMove(page) {
            if (page < 1) page = 1
            else if (page > this.lastPage) page = this.lastPage
            this.$emit('input', page)
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        currPage(val) {
            this.startPage = (Math.floor((val - 1) / this.pageBtnSize) * this.pageBtnSize) + 1
            this.init()
        }
    }
}
</script>

<style>

</style>