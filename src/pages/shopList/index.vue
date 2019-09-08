<template>
  <div class="script-container">
    <my-title title="商铺列表"></my-title>
    <div class="header-filters">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="query.shop_name" placeholder="商铺名称" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="createDialog=true">商铺录入</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="商铺录入" width="34%" :visible.sync="createDialog">
      <create-shop feature="create" @cancel="createDialog = false,  refreshData()"/>
    </el-dialog>
    <div class="table">
       <el-table
        :data="shopData"
        style="width: 100%"
		v-loading="loading"
        >
        <el-table-column
          prop="floor_id"
          label="商铺编号"
          align="center"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="shop_name"
          label="商铺名称"
          min-width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="shop_phone"
          label="商铺电话"
          min-width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="shop_pic"
          label="商铺图片"
          min-width="70"
          align="center">
        </el-table-column>
		<el-table-column
			prop="shop_mark"
			label="商铺标签"
			min-width="70"
			align="center">
		</el-table-column>
        <el-table-column
          prop="shop_desc"
          label="商铺介绍"
          min-width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-button @click="change(scope.row)"  type="text">
              修改
            </el-button>
            <el-button class="del-btn" @click="deleteIron(scope.row)"  type="text">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if='total > 0'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageIndex"
        :page-sizes="[10, 20, 30]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
 <el-dialog
   title="修改商铺信息"
   :visible.sync="changeDialog">
   <el-form ref="shopForm" label-position="right" label-width="80px"  :model="shopForm">
     <el-form-item label="门面号" prop="floor_id">
       <el-input v-model="shopForm.floor_id"></el-input>
			</el-form-item>
		<el-form-item label="商铺名称" prop="shop_name">
			<el-input v-model="shopForm.shop_name"></el-input>
		</el-form-item>
		<el-form-item label="商铺电话" prop="shop_phone">
			<el-input v-model="shopForm.shop_phone"></el-input>
		</el-form-item>
		<el-form-item label="商铺图片" prop="shop_pic">
			<el-input v-model="shopForm.shop_pic"></el-input>
		</el-form-item>
		<el-form-item label="商铺标签" prop="shop_mark">
			<el-input v-model="shopForm.shop_mark"></el-input>
		</el-form-item>
     <el-form-item label="商铺简介" prop="shop_desc">
			<el-input  
         type="textarea"
         :autosize="{ minRows: 2, maxRows: 4}" 
         v-model="shopForm.desc">
			</el-input>
     </el-form-item>
     <el-form-item class="btn-group">
       <el-button type="primary" @click="submitForm()">保存</el-button>
       <el-button @click="changeDialog = false">取消</el-button>
     </el-form-item>
   </el-form>
 </el-dialog>
 
  </div>
</template>
<script>
import createShop from './create_shop'
//import { debounce } from '../../utils'
export default {
  name: 'ironScript',
  components: {
    createShop
  },
  data() {
    return {
      changeDialog: false,
      shopForm: {
        floor_id: null,
        shop_name: '',
        shop_phone: '',
        shop_pic: '',
		shop_mark:'',
		shop_desc :'',
      },
      loading: false,
      createDialog: false,
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
	  shopData:[],
	  
    }
  },
  mounted() {
  },
  computed: {
    // queryString: function () {
    //   return Object.keys(this.query).filter(key => this.query[key] !== '')
    //     .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(this.query[key]))
    //     .join('&')
    // }
  },
  methods: {
//修改商铺信息
    change(row) {
      this.shopForm = {
        floor_id: row.floor_id,
        shop_name: row.shop_name,
        shop_phone: row.shop_phone,
        shop_pic: row.shop_pic,
		shop_mark:row.shop_mark,
		shop_desc: row.shop_desc
      }
      this.changeDialog = true
    },
	

	
  //   submitForm() {
  //     updateIron(this.ironForm).then(res => {
  //       this.$message.success('更新成功')
  //       this.refreshData()
  //       this.changeDialog = false
  //     })
  //   },
  //   refreshData: debounce(
  //     function () {
  //       this.getDataList()
  //     },
  //     800
  //   ),
  //   handleSizeChange(val) {
  //     if (this.loading) {
  //       return false
  //     }
  //     this.query.pageSize = val
  //   },
  //   handleCurrentChange(val) {
  //     if (this.loading) {
  //       return false
  //     }
  //     this.query.pageIndex = val
  //   },
  //   getDataList() {
  //     this.loading = true
  //     getIron(this.queryString).then(res => {
  //       this.query.pageIndex = res.pageIndex
  //       this.query.pageSize = res.pageSize
  //       this.total = res.total
  //       this.ironData = res.items
  //       this.loading = false
  //     })
  //   },
  //   updatePrice(row) {
  //     this.$prompt('请输入最新价格', '提示', {
  //         confirmButtonText: '确定',
  //         cancelButtonText: '取消',
  //         inputPattern: /^\+?[1-9][0-9]*$/ ,
  //         inputErrorMessage: '价格格式不正确!'
  //       }).then(({ value }) => {
  //         addNewPrice(row.id, parseFloat(value)).then(res => {
  //           this.$message.success(res)
  //           this.refreshData()
  //         })
  //       }).catch(() => {     
  //       });
  //   },
  //   watchPrice(row) {
  //     let arr = row.old_price.map(v => {
  //       return {
  //         price: v.price,
  //         date: new Date(v.createdAt).toLocaleString()
  //       }
  //     })
  //     // console.log(arr)
  //     this.chartData.rows = arr
  //     this.priceDialog = true
  //   },
  //   /**
  //    * 删除钢材
  //    */
  //   deleteIron(row) {
  //     this.$confirm('你特么这么就把钢材删了? 你赔得起吗?', '给我注意点😡', {
  //       confirmButtonText: '垃圾, 就删',
  //       cancelButtonText: '怂, 行吗, 怂',
  //       type: 'warning'
  //     }).then(() => {
  //       deleteIron(row.id).then(res => {
  //         this.$message({
  //           type: 'success',
  //           message: '删除成功!'
  //         });
  //         this.refreshData()
  //       }) 
  //     }).catch(() => {   
  //       this.$message({
  //         type: 'info',
  //         message: '怂不怂? 垃圾?'
  //       });    
  //     });
  //   }
  // },
  // watch: {
  //   query: {
  //     handler: function () {
  //       this.refreshData()
  //     },
  //     deep: true
  //   },
  //   search: {
  //     handler: function() {
  //       if(/^[0-9]*$/.test(this.search)) {
  //         this.query.id = this.search
  //         this.query.script_name = ''
  //       } else {
  //         this.query.script_name = this.search
  //         this.query.id = ''
  //       }
  //       this.refreshData()
  //     }
  //   }
  
  
  }
	}
</script>
<style lang="scss">
.script-container {
  .el-dialog {
    min-width: 474px;
  }
}
</style>

