<template>
  <div class="training_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row v-if="limitCtrl.searchBtn==1">
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="form.region1" placeholder="请选择">
                  <el-option label="客户名称" value=""></el-option>
                  <el-option label="客户企业" value="companyname"></el-option>
                  <el-option label="业务员" value="salename"></el-option>
                  <el-option label="销售员" value="username"></el-option>
                  <el-option label="课程名称" value="coursename"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-input v-model="form.name" placeholder="请输入查询值"></el-input>
            </el-form-item>
            <el-form-item>
              <el-col :span="8">
                <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" style="width: 100%;"
                                :picker-options="pickerOptions0"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">&nbsp;--</el-col>
              <el-col :span="8">
                <el-date-picker type="date" placeholder="结束日期" v-model="form.date2" style="width: 100%;"
                                :picker-options="pickerOptions0"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item :span="7">
              <el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search">查找</el-button>
              <el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">添加</el-button>
              <el-button type="info" icon="arrow-down" v-if="limitCtrl.importBtn==1" @click="dataExport">导出</el-button>
              <!--<el-upload style="display: inline-block; margin-left: 10px;" v-if="limitCtrl.importBtn==1" :on-success="handlesuccess" :before-upload="beforeAvatarUpload" :data="token"  :show-file-list="false"
                         action="/list/training/exportExcel">
               	<el-button type="primary">列表导出</el-button>
              </el-upload>-->
            </el-form-item>
          </el-row>
        </el-form>
        <!--表格块-->
        <el-table :data="tableData3" ref="multipleTable" border height="460" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width"></el-table-column>
          <el-table-column label="操作" width="calc(100% - 975px)">
            <template scope="scope">
              <el-button v-if="limitCtrl.updateBtn==1" type="text" size="small"
                         @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button v-if="limitCtrl.detailFun==1" type="text" size="small"
                         @click="handleDetail(scope.$index, scope.row)">查看详情
              </el-button>
             <el-button v-if="limitCtrl.addItemBtn==1" type="text" size="small"
                         @click="handleItemAdd(scope.$index, scope.row)">新增项目
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
    name: 'training_list',
    data() {
      return {
      	multipleTable:[],
        //时间选择限定
        pickerOptions0: {
//        disabledDate(time) {
//          return time.getTime() > Date.now();
//        }
        },
        form: {
          name: '',
          region1: '',
          date1: '',
          date2: '',
        },
        table_list: [
          {name: '序号', prop: 'index', width: '70'},
          {name: '客户名', prop: 'name', width: '100'},
          {name: '客户公司', prop: 'companyname', width: '150'},
          {name: '客户手机号', prop: 'phone', width: '150'},
          {name: '业务员', prop: 'salename', width: '150'},
          {name: '销售员', prop: 'username', width: '150'},
          {name: '课程名称', prop: 'coursename', width: '150'},
          {name: '课程地点', prop: 'courseaddress', width: '200'},
          {name: '课程时间', prop: 'coursetime', width: '200'},
        ],
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
//  	console.log("导出数据")
    	dataExport(){
				if(this.multipleSelection.length == 0){
					  this.$message({
			          message: '请选择导出客户',
			          type: 'warning'
			        });
					return false;
				}
				this.$http.get("/list/training/exportExcel", {
					params: {
						token: localStorage.CRM_token,
						trainingrecordids: this.multipleSelection
					}
				}).then(function(res) {
					//跳转下载
					location.href = "/list/training/exportExcel?trainingrecordids[]=" + this.multipleSelection+"&token="+localStorage.CRM_token;
					this.$refs.multipleTable.clearSelection();
				})
			},
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
        this.$router.push({path: "/training_list/add"})
      },
      //加载列表数据
      loadData() {
        var companyname = '';
        var salename = '';
        var username = '';
        var coursename = '';
        var name = '';
        if (this.form.region1 == "companyname") {
            companyname = this.form.name;
          } else if (this.form.region1 == "salename") {
            salename = this.form.name;
          } else if (this.form.region1 == "username"){
          	username = this.form.name;
          } else if (this.form.region1 == "coursename"){
          	coursename = this.form.name;
          } else {
          	name = this.form.name;
          }
        this.$http.get('/list/training/list', {
            params: {
              	token: localStorage.CRM_token,
              	name: name,
                companyname: companyname,
         				salename: salename,
         				username: username,
        				coursename: coursename,
                beginDate: this.form.date1 ? this.changeTime(this.form.date1) : '',
                endDate: this.form.date2 ? this.changeTime(this.form.date2) : '',
                pageNum: this.currentPage,
                pageSize: this.pageSize,
            }
          }
        ).then(function (res) {
          console.log(res)
          if (res != null && res.body.data != null && res.body.data.list.length > 0){		          
							this.tableData3 = res.body.data.list;
							console.log(res)
		          //添加一个index属性显示
		          for (var i = 0; i < this.tableData3.length; i++) {
		            this.tableData3[i].index = i + 1;
		          }
		          this.totalCount = res.body.data.total;
		          this.currentPage = res.body.data.pageNum;
          } else {
            this.tableData3 = []
          }
        })
      },
      handleSelectionChange(val) {
      	this.multipleSelection = [];
				for(var i = 0; i < val.length; i++) {
					this.multipleSelection.push(val[i].trainingrecordid)
				}
      },
      //员工信息修改页
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/training_list/update',
          query: {
            token: localStorage.CRM_token,
            trainingrecordid: row.trainingrecordid,
            intentioncustid: row.intentioncustid,
            courseid:row.courseid
          }
        })
      },
      //员工信息详情页
      handleDetail(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/training_list/detail',
          query: {
            token: localStorage.CRM_token,
            trainingrecordid: row.trainingrecordid,
            intentioncustid:row.intentioncustid,
            courseid:row.courseid
          }
        })
      },
      //新增项目
      handleItemAdd(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/training_list/item_add',
          query: {
            token: localStorage.CRM_token,
            intentioncustid:row.intentioncustid,
            courseid:row.courseid
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
      //时间转换
      changeTime(time) {
        var newTime = new Date(time);
        var yy = newTime.getFullYear();
        var mm = (newTime.getMonth() + 1) > 10 ? (newTime.getMonth() + 1) : '0' + (newTime.getMonth() + 1);
        var dd = newTime.getDate() > 10 ? newTime.getDate() : "0" + newTime.getDate();
        return (yy + "-" + mm + "-" + dd)
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
        if (newVal[8].childList[0].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[8].childList[0].map;
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
