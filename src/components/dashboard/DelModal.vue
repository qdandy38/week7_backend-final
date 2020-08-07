<template>
    <div id="delModal" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header badge-danger">
                        <h5 class="modal-title">刪除產品</h5>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-left">
                        <p>確定刪除<span class="text-danger font-weight-bold">{{tempProduct.title}}</span>？(刪除後無法復原)</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="delProduct()">
                            <div class="spinner-border spinner-border-sm" v-if="btnLoading" role="status">
                                <span class="sr-only">Loading...</span>
                           </div>
                           確定
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
/* global $ */
/* global Swal */
export default {
  props: {
    tempProduct: {}
  },
  data () {
    return {
      btnLoading: false
    }
  },
  methods: {
    delProduct () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      this.btnLoading = true
      this.$http.delete(api)
        .then(() => {
          this.$emit('done') // 告訴外層刪除完畢，執行getProducts更新畫面
          this.btnLoading = false
          $('#delModal').modal('hide') // 關閉Modal
          Swal.fire({
            toast: true,
            title: '刪除成功!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            padding: '2rem'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
