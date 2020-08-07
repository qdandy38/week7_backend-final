<template>
    <div id="delCouponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>刪除優惠卷</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delCoupon">
              <div class="spinner-border spinner-border-sm" v-if="btnLoading" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              確認刪除
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
    tempCoupon: {}
  },
  methods: {
    delCoupon () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
      this.btnLoading = true
      this.$http.delete(url)
        .then(res => {
          console.log(res)
          $('#delCouponModal').modal('hide')
          this.$emit('done')
          this.btnLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#delCouponModal {
    text-align: left;
}
</style>
