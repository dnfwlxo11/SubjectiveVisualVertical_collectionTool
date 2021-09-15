<template>
  <div class="home">
    <div class="container">
      <div class="mb-5">
        <button @click="$router.push('/')">뒤로가기</button>
        <button class="btn btn-primary mr-3">전체 데이터 추출</button>
        <button class="btn btn-warning mr-3" @click="openModal=true">데이터 등록</button>
      </div>
      <ul class="list-group" v-for="(item, idx) of originData" :key="idx">
        <li class="list-group-item mb-3" @click="getPtaImg(idx);openModal=!openModal">
          <strong>Data. {{item.pid}}</strong>&nbsp;(uid: {{item.uid}})
        </li>
      </ul>
      <add-modal v-if="openModal" @on-close="openModal=false" @on-complete="(response)=>{openModal=false;$router.push({path: '/detail', query: {date: '20210101', id: '1234'}})}"/>
      <!-- <pta-modal v-if="openModal" :data="currData" @on-close="openModal=false" @on-confirm="openModal=false" /> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import addModal from './vues/addModal.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    addModal
  },
  data() {
    return {
      originData: null,
      currData: null,
      openModal: false,

      // summ_l: {},
      // summ_r: {}
    }
  },
  methods: {
    getPtaImg(idx) {
      const ptaData = Object.keys(this.originData[idx]).reduce((acc, item) => {
        if (item.includes('pta_')) acc[item] = this.originData[idx][item]
        if (item.includes('uid') || item.includes('pid')) acc[item] = this.originData[idx][item]

        return acc
      }, {})

      this.currData = ptaData
    }
  },
  mounted() {
  }
}
</script>

<style>

</style>