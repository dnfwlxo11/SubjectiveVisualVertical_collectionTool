<template>
  <div class="home">
    <div class="container mb-3 mt-3">
      <div class="mb-5">
        <button class="btn btn-primary mr-3" @click="exportData">전체 데이터 추출</button>
        <button class="btn btn-warning mr-3" @click="$router.push('/detail')">데이터 등록</button>
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col text-left">
            <strong>{{dataCnt}}건의 데이터가 존재합니다.</strong>
          </div>
          <div class="col text-right">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label :class="{'btn-outline-primary': sort == 1}" class="btn mr-1">
                <input type="radio" @click="sort=1;loadData()"> 오래된순
              </label>
              <label :class="{'btn-outline-primary': sort == -1}" class="btn">
                <input type="radio" @click="sort=-1;loadData()"> 최신순
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul class="list-group" v-for="(item, idx) of originData" :key="idx">
          <li class="list-group-item mb-3" @click="$router.push({path: '/detail', query: {id: item._id}})">
            <div>검진일: {{item['Date']}}</div>
            <div>검진자: {{item['Tester']}}</div>
            <div>담당의: {{item['Doctor']}}</div>
          </li>
        </ul>
      </div>
      <div class="text-center justify-content-center">
        <pagination v-if="dataCnt!=0" :totalPage="dataCnt" :currPage="pageNum" :pageSize="pageSize" v-model="pageNum" />
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import XLSX from 'xlsx'
  import pagination from '@/components/pagination.vue'
  import { findAllData, findPageData } from '../db/db'
  import { remote } from 'electron'

  export default {
    name: 'Home',
    components: {
      pagination
    },
    data() {
      return {
        originData: null,
        currData: null,
        openModal: false,
        dataCnt: 0,
        pageSize: 3,
        pageNum: 1,
        sort: 1,
      }
    },
    methods: {
      async loadData() {
        this.originData = await findPageData(this.pageSize, this.pageNum, this.sort)
      },
      async getCnt() {
        this.dataCnt = await findAllData()
      },
      async exportData() {
        let exportData = await findPageData(100000, this.pageNum, this.sort)

        delete exportData['timestamp']
        delete exportData['_id']

        const wb = XLSX.utils.book_new()
        const xlsx = XLSX.utils.json_to_sheet(exportData)
        XLSX.utils.book_append_sheet(wb, xlsx, 'sheet')

        const wopts = {
          bookType: 'xlsx',
          bookSST: false,
          type: 'binary'
        };

        const path = await this.getSavePath()

        XLSX.writeFile(wb, path.filePath)
      },
      async getSavePath() {
        var options = {
          title: "Save file",
          defaultPath: "exportData",
          buttonLabel: "Save",

          filters: [
            {
              name: 'xlsx',
              extensions: ['xlsx']
            },
            {
              name: 'All Files',
              extensions: ['*']
            }
          ]
        };

        return await remote.dialog.showSaveDialog(null, options)
      },
      async init() {
        await this.getCnt()
        await this.loadData()
      }
    },
    mounted() {
      this.init()
    },
    watch: {
      pageNum() {
        this.loadData()
      }
    }
  }
</script>

<style>

</style>