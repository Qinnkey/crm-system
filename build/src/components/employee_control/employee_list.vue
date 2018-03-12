<template>
  <div class="employee_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row v-if="limitCtrl.searchBtn==1">
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="form.region1" placeholder="请选择">
                  <el-option label="全部员工" value=""></el-option>
                  <el-option label="员工名称" value="empname"></el-option>
                  <el-option label="员工手机号" value="empphone"></el-option>
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
              <el-upload style="display: inline-block; margin-left: 10px;" v-if="limitCtrl.importBtn==1" :on-success="handlesuccess" :before-upload="beforeAvatarUpload" :data="token"  :show-file-list="false"
                         action="/list/employee/importExcel">
               	<el-button type="primary">员工导入</el-button>
              </el-upload>
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
    name: 'employee_list',
    data() {
      return {
        //时间选择限定
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        form: {
          name: '',
          region1: '',
          region2: '',
          date1: '',
          date2: '',
        },
        table_list: [
          {name: '序号', prop: 'index', width: '70'},
          {name: '员工名称', prop: 'empname', width: '150'},
          {name: '手机号', prop: 'empphone', width: '150'},
          {name: '微信号', prop: 'empweixin', width: '150'},
          {name: '邮箱', prop: 'empemail', width: '200'},
          {name: '入职时间', prop: 'entrydate', width: '200'},
          {name: '员工状态', prop: 'empstatus', width: '150'},
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
        this.$router.push({path: "/employee_list/add"})
      },
      //加载列表数据
      loadData() {
//      this.loadDefault();
        var empname = '';
        var empphone = '';
        if (this.form.region1 == "empname") {
            empname = this.form.name;
          } else if (this.form.region1 == "empphone") {
            empphone = this.form.name;
          }
        this.$http.get('/list/employee/list', {
            params: {
              	token: localStorage.CRM_token,
                empname: empname,
                empphone: empphone,
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
		          //添加一个index属性显示
		          for (var i = 0; i < this.tableData3.length; i++) {
		            this.tableData3[i].index = i + 1;
		            this.tableData3[i].empstatus = this.changeStatus(this.tableData3[i].empstatus);
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
          path: '/employee_list/update',
          query: {
            token: localStorage.CRM_token,
            empid: row.empid,
          }
        })
      },
      //员工信息详情页
      handleDetail(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/employee_list/detail',
          query: {
            token: localStorage.CRM_token,
            empid: row.empid
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
      //加载默认值
      loadDefault() {
       /* this.form.date2 = new Date();
        var yy = this.form.date2.getFullYear() - 1;
        var mm = this.form.date2.getMonth();
        var dd = this.form.date2.getDate();
        this.form.date1 = new Date(yy, mm, dd);
        this.form.region1 = 'empname';*/
      },
      //员工状态转换
      changeStatus(status) {
        if (status == 1) {
          return "在岗"
        } else if (status == 2) {
          return "离职"
        } else if (status == 3) {
          return "出差"
        } else if (status == 4) {
          return "请假"
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
        if (newVal[3].childList[0].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[3].childList[0].map;
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
