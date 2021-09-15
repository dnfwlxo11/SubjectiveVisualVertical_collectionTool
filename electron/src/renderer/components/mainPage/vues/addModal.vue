<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header d-block">
            <div class="row">
              <div class="col-8 col-form-">
                <strong>데이터 등록</strong>
              </div>
              <div class="col-4 text-right">
                <a href="javascript:;" class="btn text-dark" @click="$emit('on-close')">
                  <i class="mdi mdi-close"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div class="row mb-1">
              <div class="col-form-label col-3">
                Date
              </div>
              <div class="col-9">
                <input type="text" class="form-control text-center" ref="date" v-model.trim="date" placeholder="ex. 20210101" maxlength="8">
              </div>
            </div>      
            <div class="row mb-1">
              <div class="col-form-label col-3">
                Doctor
              </div>
              <div class="col-9">
                <input type="text" class="form-control text-center" ref="doctor" v-model.trim="doctor" placeholder="ex. 홍길동" maxlength="8">
              </div>
            </div>      
            <div class="row mb-1">
              <div class="col-form-label col-3">
                Tester
              </div>
              <div class="col-9">
                <input type="text" class="form-control text-center" ref="tester" v-model.trim="tester" placeholder="ex. 홍길동" maxlength="8">
              </div>
            </div>                        
          </div>  
          <div class="modal-footer d-block">
            <div class="row">
              <div class="col-md-4 col-6 ml-auto">
                <button type="button" class="btn btn-sm btn-block text-dark" @click="$emit('on-close')">
                  <i class="mdi mdi-close"></i> 취소
                </button>
              </div>
              <div class="col-md-4 col-6 mr-auto">
                <button type="button" class="btn btn-sm btn-block text-success" @click="onClickSave()">
                  <i class="mdi mdi-check"></i> 등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DataAddModal',  
  data() {
    return {
        date: '',
        doctor: '',
        tester: ''
    }
  },
  methods: {
    escCloseListener(evt) {           
      if(evt.key != 'Escape') return false
      this.$emit('on-close')
    },    
    onClickSave() {
      if(this.date == '') {
        console.log('검사일을 입력해 주세요.')
        // this.$toasted.error('검사일을 입력해 주세요.')
        return false
      }      
      if(this.doctor == '') {
         console.log('담당의를 입력해 주세요.')
        // this.$toasted.error('담당의를 입력해 주세요.')
        return false
      }
      if(this.tester == '') {
        console.log('환자명을 입력해 주세요.')
        // this.$toasted.error('환자명을 입력해 주세요.')
        return false
      }

    //   let yyyy = this.inputBirth.substr(0,4)
    //   let mm = this.inputBirth.substr(4,2)
    //   let dd = this.inputBirth.substr(6,2)
    //   let birthDt = `${yyyy}-${mm}-${dd}`
      
    //   if(!this.$Utils.dateIsValid(new Date(birthDt))){
    //     console.log('검사일을 입력해 주세요.')
    //     // this.$toasted.error('검사일을 확인해 주세요.')
    //     return false
    //   }

      const reponseData = {
          date: this.date,
          doctor: this.doctor,
          tester: this.tester
      }

      this.$emit('on-complete', reponseData)
    },    
  },
  mounted () {
    window.addEventListener('keydown', this.escCloseListener)
    document.documentElement.style.overflowY = 'hidden'
  },
  destroyed () {
    window.removeEventListener('keydown', this.escCloseListener, false)
    document.documentElement.style.overflowY = 'auto'
  },   
  computed: {
    userProfile () {
      return this.$store.getters['getUserProfile']
    }    
  }
}
</script>


<style lang="scss" scoped>  
  .modal-container{
    max-width: 480px;
    margin-top: 100px;
  }
</style>
