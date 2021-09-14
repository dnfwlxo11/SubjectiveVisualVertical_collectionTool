<template>
  <div class="about">
    <div class="pl-5 pr-5">
      <!-- <div ref="info">
        <div class="row">
          <div class="col">
            <label for="formGroupExampleInput">의사</label>
          </div>
          <div class="col">
            <label for="formGroupExampleInput2">이름</label>
          </div>
          <div class="col">
            <label for="formGroupExampleInput2">나이</label>
          </div>
        </div>
        <div class="row">
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
        </div>
      </div> -->
      <div class="mb-5">
        <button class="btn btn-primary mr-3" @click="getData">데이터 저장</button>
        <button class="btn btn-danger" @click="getData">데이터 초기화</button>
      </div>
      <div class="row">
        <div class="col" v-for="(value, key) in data" :key="key">
          <h2 class="text-left"><strong>{{key}}</strong></h2>
          <table class="table srt-wrs-table table-bordered">
            <thead>
              <tr>
                <th class="align-middle" v-for="(item, idx) of tableHead" :key="idx">
                  {{item}}
                </th>
              </tr>
            </thead>
            <tbody v-for="(rowVal, rowKey) in data[key]" :key="rowKey">
              <tr>
                <td class="align-middle" style="white-space: nowrap;">{{rowKey}}도</td>
                <td class="align-middle" v-for="(inputVal, inputKey) in data[key][rowKey]" :key="inputKey">
                  <input type="text" class="form-control text-center no-border" v-model="data[key][rowKey][inputKey]">
                </td>
                <td><input type="text" class="form-control text-center no-border" v-model="chartData[key][rowKey]" readonly></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <graph :data="{}" />
    </div>
  </div>
</template>

<script>
import graph from './vues/graph.vue'

export default {
  name: 'about',
  components: {
    graph
  },
  data() {
    return {
      tableHead: ['', '30Hz', '45Hz', '60Hz', '평균'],
      data: {
        'left': {
          '15': {
            '30Hz': 0,
            '45Hz': 0,
            '60Hz': 0
          },
          '30': {
            '30Hz': 0,
            '45Hz': 0,
            '60Hz': 0
          },
          '45': {
            '30Hz': 0,
            '45Hz': 0,
            '60Hz': 0
          }
        },
        'right': {
          '15': {
            '30Hz': 0,
            '45Hz': 0,
            '60Hz': 0
          },
          '30': {
            '30Hz': 0,
            '45Hz': 0,
            '60Hz': 0
          },
          '45': {
            '30Hz': 0,
            '45Hz': 0,
            '60Hz': 0
          }
        }
      },
      chartData: {
        'left': {
          '15': 0,
          '30': 0,
          '45': 0
        },
        'right': {
          '15': 0,
          '30': 0,
          '45': 0
        }
      }
    }
  },
  methods: {
    getData() {
      console.log(JSON.stringify(this.data))
    },
    getAver(direction, degree) {
      let summ = Object.values(this.data[direction][degree]).reduce((a, b) => parseInt(a) + parseInt(b), 0)
      this.chartData[direction][degree] = parseFloat((summ / 3 || 0).toFixed(2))
    }
  },
  mounted() {
  },
  computed: {

  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        Object.keys(val).forEach(direction => {
          Object.keys(val[direction]).forEach(degree => {
            this.getAver(direction, degree)
          })
        })
      }
    }
  }
}
</script>
