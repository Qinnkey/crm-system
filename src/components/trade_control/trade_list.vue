<template>
  <div class="trade_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块  1续费;2尾款;3退款-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-col :span="4">
            <el-form-item>
              <el-select v-model="form.region1" placeholder="请选择" @change="handleSelectChange">
                <el-option label="交易类型" value=""></el-option>
								<el-option label="正常" value="1"></el-option>
								<el-option label="订金" value="2"></el-option>
								<el-option label="尾款" value="3"></el-option>
								<el-option label="续费" value="4"></el-option>
								<el-option label="退款" value="5"></el-option>
								<el-option label="全款" value="6"></el-option>
								<el-option label="终结" value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-form-item label-width="80px">
            <el-button v-if="limitCtrl.searchBtn==1" type="success" @click="search">查找</el-button>
          </el-form-item>
        </el-form>
        <!--表格块-->
        <el-table :data="tableData3" border style="width: 100%" height="460" @selection-change="handleSelectionChange">
          <el-table-column type="selection" fixed='left' width="55"></el-table-column>
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width"></el-table-column>
          <el-table-column v-if="limitCtrl.detailFun==1" fixed="right" label="操作" width="180">
            <template scope="scope">
              <el-button  v-if="limitCtrl.reviewFun==1" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">审核  / 详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--续费 提交-->
        <div class="renewal" style="margin-top: 20px;">
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                           :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </div>
    </main_component>
    <router-view></router-view>
  </div>
</template>

<script>
  import top_component from '@/components/module/component_top'
  import nav_left_component from '@/components/module/component_left'
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: 'trade_list',
    data() {
      return {
        form: {
          name: '',
          region1: '',
          region2: '',
          date1: '',
          date2: '',
        },
        renewal: '',		//续费
        table_list: [
          {name: '序号', prop: 'index', width: '70'},
          {name: '客户', prop: 'contact', width: '150'},
          {name: '手机号', prop: 'phone', width: '150'},
          {name: '微信号', prop: 'weixin', width: '150'},
          {name: '支付方式', prop: 'tradewayname', width: '120'},
          {name: '交易时间', prop: 'tradedate', width: '250'},
          {name: '关联项目', prop: 'itemname', width: '150'},
          {name: '交易类型', prop: 'tradetypename', width: '120'},
        ],
        tableData3: [],
        multipleSelection: [],
        //定义列表总数
        totalCount: 0,
        //定义当前页
        current_page: 0,
        //定义每页条数
        pageSize: 10,
        //select值
        tradetype: null,
        currentPage: 1,
        limitCtrl: {},		//权限控制
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      //初始化列表
      this.loadData();
    },
    methods: {
      search() {
        this.tradetype = this.form.region1;
      },
      //加载列表数据
      loadData() {
        this.$http.get('/list/tradeController/listMap', {
            params: {
              pageNum: this.current_page,
              pageSize: this.pageSize,
              tradetype: this.tradetype,
              auditstatus: 0
            }
          }
        ).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.tableData3 = json;
          this.totalCount = res.body.data.total;
          this.current_page = res.body.data.pageNum;
          for (var i = 0; i < this.tableData3.length; i++) {
            this.tableData3[i].index = i + 1;
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //审核、详情
      handleEdit(index, row) {
        //this.$router.push({path: "/trade_list/tabs"})
        this.$router.push({path: 'trade_list/add', query: {itemid: row.itemid,tradetypeval: row.tradetype,flag:"1"}});
      },
      onSubmit() {
        console.log(this.renewal)
      },
      //分页条数
      handleSizeChange(val) {
        this.pageSize = val;
        console.log('每页 条' + val);
      },
      //换页触发
      handleCurrentChange(val) {
        console.log('当前页: ' + val);
        this.current_page = val;
        this.loadData();
      },
      //搜索选择select
      handleSelectChange(val) {
        this.tradetype = val;
        this.loadData();
      },
      //权限改变
      limititem(val) {
        var newVal = [];
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < val.length; j++) {
            if (val[j].menutarget == i + 1) {
              newVal.push(val[j])
            }
          }
        }
        if (newVal[1].childList[0].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[1].childList[0].map;
      }
    }
  }
</script>

<style scoped="scoped">
  .el-button--success {
    background: #2EB398;
    border-color: #2EB398;
  }
</style>
