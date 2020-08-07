<template>
    <div id="storageDelModal" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header badge-danger">
                        <h5 class="modal-title">刪除圖片</h5>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-left">
                        <p>確定刪除這張圖片嗎？(刪除後無法復原)</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click="delStorage()">
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
export default {
  props: {
    tempStorage: {}
  },
  data () {
    return {
      btnLoading: false
    }
  },
  methods: {
    delStorage () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/storage/${this.tempStorage.id}`
      this.btnLoading = true
      this.$http.delete(url)
        .then(() => {
          this.$emit('done')
          $('#storageDelModal').modal('hide')
          this.btnLoading = false
        })
    }
  }
}
</script>
