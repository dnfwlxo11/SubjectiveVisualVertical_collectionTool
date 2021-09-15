<template>
  <div class="about">
    <div class="container">
      <div class="mb-5">
        <button class="btn btn-primary mr-3">데이터 저장</button>
        <button class="btn btn-secondary mr-3" @click="exportToPDF">PDF로 추출</button>
        <button class="btn btn-danger">데이터 초기화</button>
      </div>
      <div ref="exportPage">
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
        <div class="mb-5">
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
                  <span>
                    Tilt {{rowKey}}° (-{{rowKey}})
                  </span>
                  <span>
                    Tilt {{rowKey}}° ({{rowKey}})
                  </span>
                </td>
                <td v-else class="align-middle" style="white-space: nowrap;">{{rowKey}}</td>
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
      <graph :chart-data="recievData" />
    </div>
  </div>
</template>

<script>
  import graph from './vues/graph.vue'
  import html2pdf from 'html2pdf.js'

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
            'Horizontal': {
              'Test 1': 0,
              'Test 2': 0,
              'Test 3': 0
            }
          },
          'Right': {
            '15': {
              'Test 1': 0,
              'Test 2': 0,
              'Test 3': 0
            },
            '30': {
              'Test 1': 0,
              'Test 2': 0,
              'Test 3': 0
            },
            '45': {
              'Test 1': 0,
              'Test 2': 0,
              'Test 3': 0
            }
          },
          'Left': {
            '15': {
              'Test 1': 0,
              'Test 2': 0,
              'Test 3': 0
            },
            '30': {
              'Test 1': 0,
              'Test 2': 0,
              'Test 3': 0
            },
            '45': {
              'Test 1': 0,
              'Test 2': 0,
              'Test 3': 0
            },
          }
        },
        chartData: {
          'Horizontal': {
            'Horizontal': 0
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
        recievData: [null, 0, 0, 0, 0, 0, 0, 0, null]
      }
    },
    methods: {
      setData() {
        return [].concat([null], Object.values(this.chartData['Right']), Object.values(this.chartData['Horizontal']),
          Object.values(this.chartData['Left']), [null])
      },
      getAver(direction, degree) {
        let summ = Object.values(this.originData[direction][degree]).reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.chartData[direction][degree] = parseFloat((summ / 3 || 0).toFixed(2))
      },
      exportToPDF() {
        html2pdf(this.$refs.exportPage, {
          margin: 0,
          filename: 'document.pdf',
          image: {
            type: "jpg",
            quality: 0.95
          },
          html2canvas: {
            scrollY: 0,
            scale: 1,
            dpi: 300,
            letterRendering: true,
            ignoreElements: function (element) {
              if (element.id == "pdf-button-area") {
                return true;
              }
            }
          },
          jsPDF: {
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compressPDF: true
          }
        })
      },
    },
    mounted() {},
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