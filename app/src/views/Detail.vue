<template>
  <div class="about">
    <div class="container">
      <div class="mb-5">
        <button class="btn btn-primary mr-3" @click="saveData">그래프 저장</button>
        <button class="btn btn-secondary mr-3" @click="exportToPDF">PDF로 추출</button>
        <button class="btn btn-danger mr-3" @click="deleteOriginData">데이터 삭제</button>
        <button class="btn btn-warning" @click="$router.go()">이어서 등록</button>
      </div>
      <div ref="exportPage">
        <div>
          <div class="mb-3">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td v-for="(value, key) in drInfo" :key="key">
                    <div class="row">
                      <div class="col-2 my-auto">{{key}}</div><div class="col-10"><input type="text" class="form-control text-center no-border" v-model="drInfo[key]"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mb-3">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th v-for="(value, key) in privInfo" :key="key">
                    {{key}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="(value, key) in privInfo" :key="key">
                    <input type="text" class="form-control text-center no-border" v-model="privInfo[key]">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="align-middle" v-for="(item, idx) of tableHead" :key="idx">
                    {{item}}
                  </th>
                </tr>
              </thead>
              <tbody v-for="(value, key) in originData" :key="key">
                <h4 v-if="!key.includes('Horizontal')" class="text-left p-1 pl-3 my-auto">{{key}}</h4>
                <tr v-for="(rowVal, rowKey) in originData[key]" :key="rowKey">
                  <td v-if="!key.includes('Horizontal')" class="align-middle" style="white-space: nowrap;">
                    <span v-if="key=='Right'">
                      Tilt {{rowKey}}° (-{{rowKey}})
                    </span>
                    <span v-else>
                      Tilt {{rowKey}}° ({{rowKey}})
                    </span>
                  </td>
                  <td v-else class="align-middle" style="white-space: nowrap;">{{key}}&nbsp;({{rowKey}})</td>
                  <td class="align-middle" v-for="(inputVal, inputKey) in originData[key][rowKey]" :key="inputKey">
                    <input type="text" class="form-control text-center no-border"
                      v-model="originData[key][rowKey][inputKey]">
                  </td>
                  <td><input type="text" class="form-control text-center no-border" v-model="chartData[key][rowKey]"
                      readonly></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <graph :chart-data="recievData" ref="graph"/>
        </div>
        <div v-if="graphSvgSrc">
          <img width="100%" :src="graphSvgSrc"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import graph from './vues/graph.vue'
  import html2pdf from 'html2pdf.js'
  import { insertData, findData, updateData, deleteData } from '../db/db'

  export default {
    name: 'about',
    components: {
      graph
    },
    data() {
      return {
        drInfo: {
          'Date': '',
          'Doctor': '',
          'Tester': ''
        },
        privInfo: {
          'ID': '',
          'Name': '',
          'Age': '',
          'Sex': ''
        },
        tableHead: ['', 'Test 1', 'Test 2', 'Test 3', '평균'],
        originData: {
          'Horizontal': {
            '0': {
              'Test_1': 0,
              'Test_2': 0,
              'Test_3': 0
            }
          },
          'Right': {
            '15': {
              'Test_1': 0,
              'Test_2': 0,
              'Test_3': 0
            },
            '30': {
              'Test_1': 0,
              'Test_2': 0,
              'Test_3': 0
            },
            '45': {
              'Test_1': 0,
              'Test_2': 0,
              'Test_3': 0
            },
          },
          'Left': {
            '15': {
              'Test_1': 0,
              'Test_2': 0,
              'Test_3': 0
            },
            '30': {
              'Test_1': 0,
              'Test_2': 0,
              'Test_3': 0
            },
            '45': {
              'Test_1': 0,
              'Test_2': 0,
              'Test_3': 0
            },
          }
        },
        chartData: {
          'Horizontal': {
            '0': 0
          },
          'Right': {
            '15': 0,
            '30': 0,
            '45': 0
          },
          'Left': {
            '15': 0,
            '30': 0,
            '45': 0
          }
        },
        recievData: [null, 0, 0, 0, 0, 0, 0, 0, null],
        exportData: {},
        graphWidth: 0,
        graphSvgSrc: null,
        isFirst: null
      }
    },
    methods: {
      async saveData() {
        // 의사 정보
        Object.keys(this.drInfo).map(item => {
          this.exportData[item] = this.drInfo[item]
        })

        // 환자 정보
        Object.keys(this.privInfo).map(item => {
          this.exportData[item] = this.privInfo[item]
        })

        // 테이블 데이터
        Object.keys(this.originData).map(direction => {
          Object.keys(this.originData[direction]).map(degree => {
            Object.keys(this.originData[direction][degree]).map((test, idx) => {
              this.exportData[`${direction}_${degree}_Test_${idx+1}`] = this.originData[direction][degree][test]
            })
          })
        })

        Object.keys(this.chartData).map(direction => {
          Object.keys(this.chartData[direction]).map(degree => {
              this.exportData[`${direction}_${degree}_aver`] = this.chartData[direction][degree]
          })
        })

        this.exportData['timestamp'] = (new Date()).getTime()

        if (this.isFirst.success) await insertData(this.exportData)
        else await updateData(this.$route.query['id'], this.exportData)
      },
      async deleteOriginData() {
        await deleteData(this.$route.query['id'])
        this.$router.push('/')
      },
      setData() {
        return [].concat([null], Object.values(this.chartData['Right']), Object.values(this.chartData['Horizontal']),
          Object.values(this.chartData['Left']), [null])
      },
      getAver(direction, degree) {
        let summ = Object.values(this.originData[direction][degree]).reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.chartData[direction][degree] = parseFloat((summ / 3 || 0).toFixed(2))
      },
      exportToPDF() {
        this.graphSvgSrc = this.$refs.graph.getSvgURI() 
        html2pdf(this.$refs.exportPage, {
          margin: 5,
          filename: 'document.pdf',
          image: {
            type: "jpg",
            quality: 0.95
          },
          html2canvas:  { 
            scale: 1
          },
          jsPDF: {
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compressPDF: true
          }
        })
      },
      async init() {
        this.isFirst = await findData(this.$route.query['id'])

        if (!this.isFirst.success) {
          Object.keys(this.drInfo).forEach(item => {
            this.drInfo[item] = this.isFirst.res[item]
          })

          Object.keys(this.privInfo).forEach(item => {
            this.privInfo[item] = this.isFirst.res[item]
          })

          Object.keys(this.isFirst.res).forEach(item => {
            if (!item.includes('aver')) {
              if (item.includes('Left') || item.includes('Horizontal') || item.includes('Right')) {
                const keys = item.split('_')
                this.originData[keys[0]][keys[1]][`${[keys[2]]}_${[keys[3]]}`] = this.isFirst.res[item]
              }
            } 
          })
        }
      }
    },
    created() {
    },
    mounted() {
      this.graphWidth = this.$refs.exportPage.clientWidth
      this.init()
    },
    watch: {
      originData: {
        deep: true,
        handler(val) {
          Object.keys(val).forEach(direction => {
            Object.keys(val[direction]).forEach(degree => {
              this.getAver(direction, degree)
            })
          })

          this.recievData = this.setData()
        }
      }
    }
  }
</script>