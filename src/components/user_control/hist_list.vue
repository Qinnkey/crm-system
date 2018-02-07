<template>
  <div class="hist_list">
   <!-- <main_component @limititem="limititem">-->
   	 <main_component>
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
      		<el-col :span="5">
						<el-form-item id="inpW">
							<el-input v-model="form.searchValue" placeholder="请输入客户姓名或项目名称或业务员" label-width ="300px" style="width: 100%;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="15">
						<el-form-item>
							<el-col :span="7">
								<el-date-picker type="date" placeholder="开始时间" :picker-options="pickerOptions0" v-model="form.beginDate" style="width: 100%;"></el-date-picker>
							</el-col>
							<el-col class="line" :span="1">&nbsp;--</el-col>
							<el-col :span="7">
								<el-date-picker type="date" placeholder="结束时间" :picker-options="pickerOptions1" v-model="form.endDate" style="width: 100%;"></el-date-picker>
							</el-col>
						</el-form-item>
					</el-col>
          <el-form-item label-width="80px">
            <el-button type="success" @click="search">查找</el-button>
          </el-form-item>
        </el-form>
        <!--表格块-->
        <el-table :data="tableData3" border style="width: 100%" height="460">
          <el-table-column type="selection" fixed='left' width="55"></el-table-column>
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width"></el-table-column>
        </el-table>
        <!--分页提交-->
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
    name: 'hist_list',
    data() {
      return {
      	pickerOptions0: {
          disabledDate(time) {
            return time.getTime() >= Date.now();
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        form: {
					searchValue: '',
					beginDate: '',
					endDate: '',
				},
        renewal: '',		//续费
        table_list: [
          {name: '序号', prop: 'index', width: '100'},
          {name: '客户', prop: 'contact', width: '150'},
          {name: '公司名称', prop: 'companyname', width: '250'},
          {name: '项目名称', prop: 'itemname', width: '250'},
          {name: '变更前业务员', prop: 'beforesalename', width: '150'},
          {name: '变更后业务员', prop: 'endsalename', width: '150'},
          {name: '创建人', prop: 'username', width: '150'},
          {name: '创建时间', prop: 'createdate', width: '250'},
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
        this.loadData();
      },
      //加载列表数据
      loadData() {
      	console.log({
              pageNum: this.current_page,
              pageSize: this.pageSize,
              searchValue: this.form.searchValue,
              beginDate: this.form.beginDate,
              endDate:this.form.endDate,
            });
        this.$http.get('/list/salesCustHistController/histList', {
            params: {
              pageNum: this.current_page,
              pageSize: this.pageSize,
              searchValue: this.form.searchValue,
              beginDate: this.form.beginDate ? this.changeTime(this.form.beginDate) : '',
							endDate: this.form.endDate ? this.changeTime(this.form.endDate) : '',
            }
          }
        ).then(function (res) {
        	 console.log("-------------res----------",res);
        	 if(res != null && res.body.data != null){
        	 	var json = res.body.data.list;
	          //加载json对象，如果是json字符串要eval()转成json对象
	          this.tableData3 = json;
	          this.totalCount = res.body.data.total;
	          this.current_page = res.body.data.pageNum;
	          for (var i = 0; i < this.tableData3.length; i++) {
	            this.tableData3[i].index = i + 1;
	          }
        	 }
        })
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
      changeTime(time){
				var newTime = new Date(time);
				var yy = newTime.getFullYear();
				var mm = newTime.getMonth() + 1;
				var dd = newTime.getDate();

				return(yy + "-" + mm + "-" + dd)
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

<style type="text/css">
	.table_list .el-form #inpW .el-input input{width: 300px;}
</style>
<style scoped="scoped">
  .el-button--success {
    background: #2EB398;
    border-color: #2EB398;
  }
</style>
