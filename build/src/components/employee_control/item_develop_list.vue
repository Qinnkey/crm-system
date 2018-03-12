<template>
  <div class="item_develop_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row v-if="limitCtrl.searchBtn==1">
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="form.region1">
                  <el-option label="项目名称" value="itemname"></el-option>
                  <!--<el-option label="责任人" value="responsible"></el-option>
                  <el-option label="小组负责人" value="groupresponsible"></el-option>-->
                </el-select>
              </el-form-item>
            </el-col>
            <!--<el-col :span="4">
              <el-form-item>
                <el-input type="text" :disabled="true" v-model="form.itemname" ></el-input>
                <!--<el-button type="" >项目名称</el-button>-->
              <!--</el-form-item>
            </el-col>-->
            
            <el-form-item>
              <el-input v-model="form.name" placeholder="请输入查询值"></el-input>
            </el-form-item>          
            <el-form-item :span="7">
              <el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search">查找</el-button>
              <el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">添加</el-button>
              
              <!--<el-upload style="display: inline-block; margin-left: 10px;" v-if="limitCtrl.importBtn==1" :on-success="handlesuccess" :before-upload="beforeAvatarUpload" :data="token"  :show-file-list="false"
                         action="/list/employee/importExcel">
               	<el-button type="primary">员工导入</el-button>
              </el-upload>-->
            </el-form-item>
          </el-row>
        </el-form>
        <!--表格块-->
        <el-table :data="tableData3" border height="460" @selection-change="handleSelectionChange">
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width"></el-table-column>
          <el-table-column label="操作" width="calc(100% - 975px)">
            <template scope="scope">
              <el-button v-if="limitCtrl.updateFun==1" type="text" size="small"
                         @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button v-if="limitCtrl.detailFun==1" type="text" size="small"
                         @click="handleDetail(scope.$index, scope.row)">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="renewal" style="margin-top: 20px;">
          <!--分页器-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper"
                           :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </div>
    </main_component>
    <router-view @reload="reload"></router-view>
  </div>
</template>

<script>
  import top_component from '@/components/module/component_top'
  import nav_left_component from '@/components/module/component_left'
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: 'item_develop_list',
    data() {
      return {
        //时间选择限定
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        form: {
          name: '',              // 要查询的输入值
          region1: 'itemname',           // 绑定的查询类型 
//        itemname:'',
          date1: '',
          date2: '',
        },
        table_list: [
        	{name: '序号', prop: 'index', width: '70'},
        	{name: '项目名称', prop: 'itemname', width: '200'},
          {name: '项目负责人', prop: 'createby', width: '120'},
          {name: '项目状态', prop: 'devstatus', width: '120'},
          {name: '交付状态', prop: 'delystatus', width: '120'},
          {name: '开发时间起', prop: 'devdatebegin', width: '200'},
          {name: '开发时间止', prop: 'devdateend', width: '200'},
        ],
        // 所有部门
        tableData3: [],
        multipleSelection: [],
        //定义列表总数
        totalCount: 0,
        //定义当前页
        currentPage: 1,
        //定义每页条数
        pageSize: 10,
        limitCtrl: {},		//权限控制
      	token: ''
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
    	this.token ={"token":localStorage.CRM_token};
      //初始化列表
      this.loadData();
    },
    methods: {
      reload(text) {
        if (text == 1) {
          this.loadData();
        }
      },
      //搜索
      search() {
          this.loadData();
      },
      add() {
        this.$router.push({path: "/item_develop_list/add"})
      },
      //加载列表数据
      loadData() {
        this.$http.get('/list/itemDevelop/list', {
            params: {
              	token: localStorage.CRM_token,
                itemname: this.form.name,
                devid:'',
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            }
          }
        ).then(function (res) {
          console.log(res)
          if (res != null && res.body.data != null && res.body.data.list.length > 0){		          
//        	for (var j=0; j<res.body.data.list.length; j++) {
//        		this.tableData3.push(res.body.data.list[j])
//        	}
							this.tableData3 = res.body.data.list;
//							console.log("-------------------------->", this.tableData3)
//							this.$set(this.tableData3, res.body.data.list)
		          //添加一个index属性显示
	            var that =  this; 
		          for (var i = 0; i < this.tableData3.length; i++) {
		          	(function(i){
			            that.tableData3[i].index = i + 1;
			            if (that.tableData3[i].delystatus == 1){
			            	that.tableData3[i].delystatus = '正常交付'
			            } else if (that.tableData3[i].delystatus == 2){
			            	that.tableData3[i].delystatus = '逾期交付'
			            }
			            switch (that.tableData3[i].devstatus){
			            	case 1:that.tableData3[i].devstatus = '前期';
			            		break;
			            	case 2:that.tableData3[i].devstatus = '开发中';
			            		break;
			            	case 3:that.tableData3[i].devstatus = '逾期';
			            		break;
			            	case 4:that.tableData3[i].devstatus = '完成';
			            		break;
			            	default:that.tableData3[i].devstatus = '';
			            		break;
			            }
									that.$http.post('/list/user/getone',{
												token : localStorage.CRM_token,
												userid: that.tableData3[i].createby,
										},{emulateJSON: true}).then(function(res){
											if(res.body.code='100' && res.body.data != null){
												that.tableData3[i].createby = res.body.data.petname
												console.log(that.tableData3[i].createby)
											}
										})
		          	})(i);
				          }
		          this.totalCount = res.body.data.total;
		          this.currentPage = res.body.data.pageNum;
          } else {
            this.tableData3 = []
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //员工信息修改页
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/item_develop_list/update',
          query: {
            token: localStorage.CRM_token,
            devid: row.devid,
            itemid: row.itemid,
          }
        })
      },
      //员工信息详情页
      handleDetail(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/item_develop_list/detail',
          query: {
            token: localStorage.CRM_token,
            devid: row.devid,
            itemid: row.itemid,
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
        this.currentPage = val;
        if(this.tableData3.length>0){
        		this.loadData();
        }
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
        if (newVal[3].childList[5].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[3].childList[5].map;
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
