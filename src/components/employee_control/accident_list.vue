<template>
  <div class="accident_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row v-if="limitCtrl.searchBtn==1">
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="form.region1" placeholder="请选择">
                  <el-option label="项目名称" value="itemname"></el-option>
                  <el-option label="责任人" value="responsible"></el-option>
                  <el-option label="小组负责人" value="groupresponsible"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
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
    name: 'accident_list',
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
          region2: '',
          date1: '',
          date2: '',
        },
        table_list: [
        	{name: '序号', prop: 'index', width: '70'},
        	{name: '项目名称', prop: 'itemname', width: '150'},
          {name: '事故描述', prop: 'description', width: '200'},
          {name: '事故起因', prop: 'cause', width: '200'},
          {name: '解决方案', prop: 'solution', width: '200'},
          {name: '是否首次', prop: 'status', width: '100'},
          {name: '部门', prop: 'department', width: '150'},
          {name: '责任人', prop: 'responsible', width: '100'}, 
          {name: '小组负责人', prop: 'groupresponsible', width: '110'},
          {name: '发生时间', prop: 'time', width: '150'},
        ],
        // 所有部门
        allDeps: [],  
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

      //显示所有部门
    	this.loadAllDeps();
      //初始化列表
      this.loadData();

      
    },
    methods: {
      reload(text) {
        if (text == 1) {
          this.loadData();
        }
      },
      //显示所有部门
    	loadAllDeps(){
    			this.$http.get('/list/organize/listAllOrgs', {
    				params: {
              	token: localStorage.CRM_token,
              	orgid:'1',
            }
    			}).then(function(res){
    					if (res != null && res.body.data != null && res.body.data.length > 0){
    							this.allDeps = res.body.data;
    					}
    			})
    	},
      //搜索
      search() {
          this.loadData();
      },
      add() {
        this.$router.push({path: "/accident_list/add"})
      },
      //加载列表数据
      loadData() {
        var itemname = '';
        var responsible = '';
        var groupresponsible = '';
        
        if (this.form.region1 == "itemname") {
            itemname = this.form.name;
          } else if (this.form.region1 == "responsible") {
            responsible = this.form.name;
          } else if (this.form.region1 == "groupresponsible") {
          	groupresponsible = this.form.name;
          }
        this.$http.get('/list/accident/list', {
            params: {
              	token: localStorage.CRM_token,
                itemname: itemname,
                responsible: responsible,
                groupresponsible:groupresponsible,
                accidentid:'',
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            }
          }
        ).then(function (res) {
          console.log(res)
          if (res != null && res.body.data != null && res.body.data.list.length > 0){		          
							this.tableData3 = res.body.data.list;
		          //添加一个index属性显示
		          for (var i = 0; i < this.tableData3.length; i++) {
		            this.tableData3[i].index = i + 1;
		            this.tableData3[i].status = this.tableData3[i].status == "0"?"是":"否";
		            for(var j =0; j < this.allDeps.length; j++){
		            	if (this.tableData3[i].department == this.allDeps[j].orgid){
		            			this.tableData3[i].department = this.allDeps[j].departname;
		            	}
		            }
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
          path: '/accident_list/update',
          query: {
            token: localStorage.CRM_token,
            accidentid: row.accidentid,
          }
        })
      },
      //员工信息详情页
      handleDetail(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/accident_list/detail',
          query: {
            token: localStorage.CRM_token,
            accidentid: row.accidentid,
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
      //上传前判断
      beforeAvatarUpload(file) {
        console.log(file);
        var isJPG = false;
        var fileext = file.name.substring(file.name.lastIndexOf("."), file.name.length);
        console.log(fileext)
        if (fileext === '.xls' || fileext == '.xlsx') {
          isJPG = true;
        }
        if (!isJPG) {
          this.$message.error('只能上传Execl格式!');
        }
        return isJPG;
      },
      handlesuccess(file) {
	      this.$message({
	          message: '上传成功',
	          type: 'success'
	        });
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
        if (newVal[3].childList[4].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[3].childList[4].map;
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
