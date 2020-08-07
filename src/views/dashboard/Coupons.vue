<template>
  <div class="container mt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex justify-content-between align-items-center">
      <pagination :pages="pagination" @change-pages="getCoupons"></pagination>
      <button class="btn btn-primary" @click="openCouponModal('created')">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.deadline.datetime }}</td>
          <td>
            <span v-if="item.enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openCouponModal('edit', item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openCouponModal('delete', item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <couponModal :tempCoupon="tempCoupon" :time="time" :status="status" @done="getCoupons"></couponModal>
    <couponDelModal :tempCoupon="tempCoupon" @done="getCoupons"></couponDelModal>
  </div>
</template>
<script>
/* global $ */
import pagination from '../../components/Pagination.vue'
import couponModal from '../../components/dashboard/CouponModal'
import couponDelModal from '../../components/dashboard/CouponDelModal'
export default {
  components: {
    pagination,
    couponModal,
    couponDelModal
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: ''
      },
      pagination: {},
      isLoading: false,
      time: {
        due_date: '',
        due_time: ''
      },
      status: '' // 新增、編輯、刪除狀態
    }
  },
  methods: {
    // 取得所有優惠券資料
    getCoupons (page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then(res => {
          this.coupons = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
    },
    openCouponModal (status, item) {
      this.status = status
      switch (status) {
        case 'created':
          this.tempCoupon = {
            enabled: false
          }
          $('#couponModal').modal('show')
          break
        case 'edit': {
          this.tempCoupon = { ...item } // 物件解構，tempCoupon !== item
          // 使用 split 切割相關時間戳
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ')
          this.time.due_date = dedlineAt[0]
          this.time.due_time = dedlineAt[1]
          $('#couponModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = { ...item }
          $('#delCouponModal').modal('show')
          break
      }
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
