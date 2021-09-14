<template>
  <div class="about">
    <h3>chart input page</h3>
    <div class="container">
      <div ref="info">
        <div class="row">
          <div class="col">
            <label for="formGroupExampleInput">번호</label>
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
      </div>
      <div ref="data">
        <div class="row">
          <div class="col">
            <label for="formGroupExampleInput">Example label</label>
          </div>
          <div class="col">
            <label for="formGroupExampleInput2">Another label</label>
          </div>
          <div class="col">
            <label for="formGroupExampleInput2">Another label</label>
          </div>
          <div class="col">
            <label for="formGroupExampleInput2">평균</label>
          </div>
        </div>
        <form class="row">
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
          <div class="col form-group">
            <input class="form-control" type="text" placeholder="Average" readonly>
          </div>
        </form>
        <form class="row">
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
          <div class="col form-group">
            <input class="form-control" type="text" placeholder="Average" readonly>
          </div>
        </form>
        <form class="row">
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
          <div class="col form-group">
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
          </div>
          <div class="col form-group">
            <input class="form-control" type="text" placeholder="Average" readonly>
          </div>
        </form>
      </div>
      <graph />
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
  methods: {

  },
  mounted() {
    console.log(this.$refs)
  }
}
</script>
