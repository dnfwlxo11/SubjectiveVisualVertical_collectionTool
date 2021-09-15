<template>
  <div class="home">
    <div class="container">
      <div class="mb-5">
        <button class="btn btn-primary mr-3">전체 데이터 추출</button>
      </div>
      <ul class="list-group" v-for="(item, idx) of originData" :key="idx">
        <li class="list-group-item mb-3" @click="getPtaImg(idx);openModal=!openModal">
          <strong>Data. {{item.pid}}</strong>&nbsp;(uid: {{item.uid}})
        </li>
      </ul>
      <pta-modal v-if="openModal" :data="currData" @on-close="openModal=false" @on-confirm="openModal=false" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ptaModal from './vues/ptaModal.vue'
import { dummy } from '@/dummy.js'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    ptaModal
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
    async loadData() {
      // const response = await axios.get('/data')
      // this.originData = response.data.items.slice(1, 11)
      this.originData = dummy
      // this.sum()
    },

    // sum() {
    //   Object.keys(this.originData[0]).forEach(item => {
    //     this.summ_l[item] = 0
    //     this.summ_r[item] = 0
    //   })

    //   this.originData.forEach((item, idx) => {
    //     Object.keys(item).forEach(value => {
    //       if (value.includes('cause_') || value.includes('text_')) {
    //         if (item['uid'].includes('-l')) {
    //           if (item[value] == 1) 
    //             this.summ_l[value] += 1
    //         } else {
    //           if (item[value] == 1) 
    //             this.summ_r[value] += 1
    //         } 
    //       }
    //     })
    //   })

    //   console.log(this.summ_l, this.summ_r)
    // },

    getPtaImg(idx) {
      console.log(this.originData)

      const ptaData = Object.keys(this.originData[idx]).reduce((acc, item) => {
        if (item.includes('pta_')) acc[item] = this.originData[idx][item]
        if (item.includes('uid') || item.includes('pid')) acc[item] = this.originData[idx][item]

        return acc
      }, {})

      this.currData = ptaData
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style>

</style>