<template>
    <div id="orders" class="container mt-3">
        <loading :active.sync="isLoading"></loading>
        <pagination :pages="pagination" @change-pages="getOrders"></pagination>
        <table class="table table-hover mt-3 text-left">
            <thead>
                <tr>
                    <th>下單時間</th>
                    <th>購買款項</th>
                    <th>付款方式</th>
                    <th class="text-center">應付金額</th>
                    <th class="text-center">是否付款</th>
                </tr>
            </thead>
            <tbody v-if="orders.length">
                <tr v-for="(item) in orders" :key="item.id" :class="{'text-secondary': !item.is_paid}">
                    <td>{{ item.created.datetime }}</td>
                    <td>
                        <ul class="list-unstyled">
                            <li v-for="(product, i) in item.products" :key="i">
                                {{ product.product.title }} 數量：{{ product.quantity }}
                                {{ product.product.unit }}
                            </li>
                        </ul>
                    </td>
                    <td>{{ item.payment }}</td>
                    <td class="text-center">{{ item.amount }}</td>
                    <td class="text-center">
                        <div class="custom-control custom-switch paid-switch">
                            <input :id="item.id" v-model="item.paid" type="checkbox" class="custom-control-input" @change="setOrderPaid(item)">
                            <label class="custom-control-label" :for="item.id">
                                <strong v-if="item.paid" class="text-success">已付款</strong>
                                <span v-else class="text-muted">尚未付款</span>
                            </label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import pagination from '../../components/Pagination.vue'
export default {
  components: {
    pagination
  },
  data () {
    return {
      orders: [],
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getOrders (page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          this.orders = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
    },
    setOrderPaid (item) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`
      if (!item.paid) { // 尚未付款
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`
      }
      this.isLoading = true

      this.$http.patch(url, item.id).then(() => {
        this.getOrders()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
<style lang="scss" scoped>
.paid-switch label:hover,
paid-switch input:hover{
  cursor: pointer;
}
</style>
