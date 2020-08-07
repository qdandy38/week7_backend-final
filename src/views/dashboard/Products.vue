<template>
  <div id="products" class="container mt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex justify-content-between align-items-center">
      <pagination :pages="pagination" @change-pages="getProducts"></pagination>
      <button class="btn btn-primary" @click="openModal('new')">建立新產品</button>
    </div>
    <table class="table table-hover mt-3">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120" class="text-center">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.origin_price}}</td>
          <td>{{item.price}}</td>
          <td class="text-center">
            <span class="text-success" v-if="item.enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-primary" @click="openModal('edit',item)">編輯</button>
              <button type="button" class="btn btn-outline-danger" @click="openModal('delete',item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal -->
    <productModal :temp-product="tempProduct" :is-new="isNew" @done="getProducts"></productModal>
    <delModal :temp-product="tempProduct" @done="getProducts"></delModal>
  </div>
</template>
<script>
/* global $ */
import pagination from '../../components/Pagination.vue'
import productModal from '../../components/dashboard/ProductModal'
import delModal from '../../components/dashboard/DelModal'
export default {
  components: {
    pagination,
    productModal,
    delModal
  },
  data () {
    return {
      products: [], // 儲存所有產品
      isLoading: false,
      pagination: {}, // 儲存頁碼資訊
      tempProduct: {
        imageUrl: [],
        enable: false
      }, // 儲存當前要處理的產品
      isNew: false // 是否為新產品，判斷是編輯還是新增
    }
  },
  props: ['token'],
  methods: {
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProduct (id) { // 取得單一商品資料
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          this.tempProduct = res.data.data // 取得的單一產品資料存入tempProduct，作為等等modal開啟的預設值
          $('#productModal').modal('show') // 確認資料存入後再開啟Modal
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
            enable: false
          }
          this.isNew = true // 新增狀態
          $('#productModal').modal('show')
          break
        case 'edit':
          // description欄位必須透過取得單一產品的方式，因此會執行 AJAX
          this.getProduct(item.id)
          this.isNew = false // 編輯狀態
          break
        case 'delete':
          this.tempProduct = JSON.parse(JSON.stringify(item)) // 深層複製
          $('#delModal').modal('show')
          break
      }
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
