<template>
  <div class="home">
    <div class="container">
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
              <label :class="{'btn-primary': sort == 1}" class="btn mr-1">
                <input type="radio" @click="sort=1;loadData()"> 등록순
              </label>
              <label :class="{'btn-primary': sort == -1}" class="btn">
                <input type="radio" @click="sort=-1;loadData()"> 최신순
              </label>
            </div>
          </div>
        </div>
      </div>
      <div style="min-height: 600px">
        <ul class="list-group" v-for="(item, idx) of originData" :key="idx">
          <li class="list-group-item mb-3" @click="$router.push({path: '/detail', query: {id: item._id}})">
            <div>검진일: {{item['Date']}}</div>
            <div>검진자: {{item['Tester']}}</div>
            <div>담당의: {{item['Doctor']}}</div>
          </li>
        </ul>
      </div>
      <div>
          <button class="btn btn-secondary mr-3" @click="pageDown">이전</button>
          <button class="btn btn-secondary mr-3" @click="pageUp">다음</button>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { findAllData, findPageData } from '../db/db'

export default {
  name: 'Home',
  data() {
    return {
      originData: null,
      currData: null,
      openModal: false,
      dataCnt: 6,
      pageSize: 5,
      pageNum: 0,
      sort: 1,
    }
  },
  methods: {
    pageUp() {
      if (this.dataCnt/this.pageSize > (this.pageNum + 1) )
      this.pageNum += 1
      this.loadData()
    },
    pageDown() {
      if (this.pageNum) {
        this.pageNum -= 1
        this.loadData()
      }
    },
    async loadData() {
      this.originData = await findPageData(this.pageSize, this.pageNum, this.sort)
    },
    async getCnt() {
      this.dataCnt = await findAllData()
    },
    exportData() {
      console.log(this.originData)
    },
    async init() {
      await this.getCnt()
      await this.loadData()
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>

</style>