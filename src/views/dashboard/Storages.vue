<template>
    <div id="storages" class="container mt-3">
        <loading :active.sync="isLoading"></loading>
        <pagination :pages="pagination" @change-pages="getStorages"></pagination>
        <table class="table table-hover mt-3 text-left text-center">
            <thead>
                <tr>
                    <th>圖片縮圖</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-if="storages.length">
                <tr v-for="(item) in storages" :key="item.id">
                    <td><img :src="item.path" width="200px" class="img-fluid"></td>
                    <td>
                        <button class="btn btn-outline-danger" @click.prevent="openModal(item)">
                            刪除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <storageDelModal :tempStorage="tempStorage" @done="getStorages"></storageDelModal>
    </div>
</template>
<script>
import pagination from '../../components/Pagination.vue'
import storageDelModal from '../../components/dashboard/StorageDelModal'
/* global $ */
export default {
  components: {
    pagination,
    storageDelModal
  },
  data () {
    return {
      storages: [],
      isLoading: false,
      pagination: {},
      tempStorage: {}
    }
  },
  methods: {
    getStorages () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/storage`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          this.storages = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
    },
    openModal (item) {
      this.tempStorage = { ...item }
      console.log(this.tempStorage)
      $('#storageDelModal').modal('show')
    }
  },
  created () {
    this.getStorages()
  }
}
</script>
<style lang="scss" scoped>
#storages td {
    vertical-align: middle;
}
</style>
