<template>
  <div class>
    <el-table
      :data="tableData"
      height = "400"
      style="width: 100%; margin-top: 20px"
      :summary-method="getSummaries"
      show-summary
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="index" label="编号" sortable width="180" />
      <el-table-column prop="type" label="餐型" sortable width="180" />
      <el-table-column prop="time" label="时间" sortable width="180" />
      <el-table-column prop="name" label="姓名"  width="180" />
      <el-table-column prop="address" label="份/单" :formatter="formatter" />
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      tableData: [{
        date: '',
        name: '',
        address: ''
      }]
    }
  },
  created() {
    const url = 'http://localhost:3000/orderlist'
    axios.get(url).then((res) => {
      this.tableData = res.data.info
    })
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            console.log(prev,curr)
            const value = Number(curr)
            if (!isNaN(value)) { //如果是一个数字
              return prev + curr //sum
            } else {
              return prev
            }
          }, 0);
        } else {
          sums[index] = 'N/A'
        }
      })
      sums[0] = '共计'+ this.tableData.length + '单'
      sums[1] = 'A餐型:' + sums[1]
      sums[4] = sums[4] + '份'
      return sums
    }
  }
}

</script>

<style scoped lang="stylus"></style>
