<template>
  <div id="couponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header badge-primary">
          <h5 id="exampleModalLabel" class="modal-title">
            建立優惠券
          </h5>
          <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="title">標題</label>
            <input id="title" v-model="tempCoupon.title" type="text" class="form-control" placeholder="請輸入標題">
          </div>
          <div class="form-group">
            <label for="coupon_code">優惠碼</label>
            <input id="coupon_code" v-model="tempCoupon.code" type="text" class="form-control" placeholder="請輸入優惠碼">
          </div>
          <div class="form-group">
            <label for="due_date">到期日</label>
            <input id="due_date" v-model="time.due_date" type="date" class="form-control">
          </div>
          <div class="form-group">
            <label for="due_time">到期時間</label>
            <input id="due_time" v-model="time.due_time" type="time" step="1" class="form-control">
          </div>
          <div class="form-group">
            <label for="price">折扣百分比</label>
            <input id="price" v-model="tempCoupon.percent" type="number" class="form-control" placeholder="請輸入折扣數量">
          </div>
          <div class="form-group">
            <div class="form-check">
              <input id="enabled" v-model="tempCoupon.enabled" class="form-check-input" type="checkbox" :true-value="true" :false-value="false">
              <label class="form-check-label" for="enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            關閉
          </button>
          <button type="button" class="btn btn-primary" @click="updateCoupon">
            <div class="spinner-border spinner-border-sm" v-if="btnLoading" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global $ */
export default {
  data () {
    return {
      btnLoading: false
    }
  },
  props: {
    tempCoupon: {
      enabled: false
    },
    time: {},
    status: String
  },
  methods: {
    updateCoupon () {
      let url = ''
      let methods = ''
      if (this.status === 'created') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`
        methods = 'post'
      } else if (this.status === 'edit') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
        methods = 'patch'
      }
      // 將日期、時間轉換成正確格式存入tempCoupon
      this.tempCoupon.deadline_at = `${this.time.due_date} ${this.time.due_time}`
      this.btnLoading = true
      this.$http[methods](url, this.tempCoupon)
        .then(res => {
          $('#couponModal').modal('hide')
          this.$emit('done') // 告訴外層已更新完畢，重新渲染畫面
          this.btnLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#couponModal {
    text-align: left;
}
</style>
