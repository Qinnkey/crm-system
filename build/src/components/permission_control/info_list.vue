<template>
  <div class="info_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row>
            <el-col :span="3" v-if="limitCtrl.searchBtn==1">
              <el-form-item>
                <el-select v-model="form.search_type" placeholder="请选择" @change="changeType">
                  <el-option label="角色" value="permission"></el-option>
                  <el-option label="账号状态" value="status"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="limitCtrl.searchBtn==1" :span="2">
              <el-form-item>
                <el-select v-model="form.roleid" v-if="form.search_type=='permission'" placeholder="请选择">
                  <el-option v-for="item in rolelist" :key="item.roleid" :label="item.rolename"
                             :value="item.roleid"></el-option>
                </el-select>
                <el-select v-model="form.status" v-if="form.search_type=='status'" placeholder="请选择">
                  <el-option label="禁用" value="0"></el-option>
                  <el-option label="正常" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item v-if="limitCtrl.searchBtn==1">
              <el-col :span="8">
                <el-date-picker type="date" placeholder="起始日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">&nbsp;--</el-col>
              <el-col :span="8">
                <el-date-picker type="date" placeholder="结束日期" v-model="form.date2"
                                style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label-width="80px">
              <el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search">查找</el-button>
              <el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">添加</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <!--表格块-->
        <el-table v-loading.body="loading" :data="tableData3" border style="width: 100%" height="460"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" fixed='left' width="55"></el-table-column>
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width"></el-table-column>
          <el-table-column fixed="right" label="操作" width="calc(100% - 900px) ">
            <template scope="scope">
              <el-button v-if="limitCtrl.updateFun==1" type="text" size="small"
                         @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button type="text" v-if="scope.row.userstatus=='正常使用'&&limitCtrl.ableFun==1" size="small"
                         @click="handleUse(scope.$index, scope.row)">禁用
              </el-button>
              <el-button type="text" v-if="scope.row.userstatus=='禁止使用'&&limitCtrl.ableFun==1" size="small"
                         @click="handleUse(scope.$index, scope.row)">启用
              </el-button>
              <el-button v-if="limitCtrl.detailFun==1" type="text" size="small"
                         @click="handleDetail(scope.$index, scope.row)">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="renewal" style="margin-top: 20px;">
          <div class="block" style="float: right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="currentPage" :page-size="10" layout="total,prev, pager, next, jumper"
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
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: 'info_list',
    data() {
      return {
        form: {
          search_type: '',
          status: '',
          roleid: '',
          date1: '',
          date2: '',
          userid: '',
//          target:'',
        },
        renewal: '',		//续费
        table_list: [
          {name: '昵称', prop: 'petname', width: '150'},
          {name: '账号', prop: 'username', width: '150'},
          {name: '角色类型', prop: 'rolename', width: '150'},
          {name: '邮箱', prop: 'saleemail', width: '200'},
          {name: '账号状态', prop: 'userstatus', width: '150'},
          {name: '添加时间', prop: 'createdate', width: '190'},
        ],
        rolelist: [],
        loading: false,
        tableData3: [],
        multipleSelection: [],
        currentPage: 0,
        totalCount: 0,
        limitCtrl: {},		//权限控制
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      this.petname = localStorage.CRM_petname;
      this.loading = true;
      this.localData();
      this.localData2(null);
    },
    methods: {
      reload: function (text) {
        if (text == 1) {
          this.localData2(this.currentPage);
        }
      },
      //改变 搜索的种类
      changeType() {
//        console.log("我要变形了！")
        this.form.roleid = '';
        this.form.status = '';
      },
      //搜索
      search() {
        console.log(this.form.date1 + "---" + this.form.date2);
        this.loading = true;
        this.$http.post('/list/user/list', {
          "token": localStorage.CRM_token,
          "roleid": this.form.roleid == '' ? null : this.form.roleid,
          "status": this.form.status == '' ? null : this.form.status,
          "begintime": this.form.date1 == '' ? null : this.changeTime(this.form.date1),
          "endtime": this.form.date2 == '' ? null : this.changeTime(this.form.date2),
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.tableData3 = json;
//          if (this.tableDat == null) {
//            this.tableData3 = [];
//          }
          console.log(this.tableData3);
          if (this.tableData3 != null) {
            this.tableData3.forEach(function (o) {
              if (o.userstatus == 0) {
                o.userstatus = '禁止使用';
              } else {
                o.userstatus = '正常使用'
              }
            });
            this.totalCount = res.body.data.total;
            this.currentPage = res.body.data.pageNum;
          }
          this.loading = false;
        })
      },
      //添加
      add() {
        this.$router.push({path: "/info_list/add"})
      },
      //列表选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },

      //修改
      handleEdit(index, row) {
//        console.log(index, row);
        this.$router.push({
          path: "/info_list/add",
          query: {itemid: row.userid, roleid: row.roleid, petname: row.petname, username: row.username}
        });
      },
      //是否禁用
      handleUse(index, row) {
        console.log(index, row.userstatus == '正常使用' ? 0 : 1);

        this.$http.post('/list/user/update', {
          "token": localStorage.CRM_token,
          "enable": 'enable',
          "userid": row.userid,
          "status": row.userstatus == '正常使用' ? 0 : 1,
        }, {emulateJSON: true}).then(function (res) {
          if (res.body.code == 100) {
            this.message("状态改变成功！", 'success');
            this.localData2(null);
          } else {
            this.message(res.body.msg, 'error');
          }
        });

      },
      //查看详情
      handleDetail(index, row) {
        console.log(index, row)
        this.$router.push({path: "/permission_list", query: {itemid: row.roleid}});
      },
      //页码改变触发
      handleSizeChange(val) {
        console.log('每页 ' + val + ' 条');
      },
      //currentPage 改变时会触发
      handleCurrentChange(val) {
        console.log('当前页:' + val);
        this.localData2(val);
      },
      localData() {
        this.$http.post('/list/role/list', {"token": localStorage.CRM_token,}, {emulateJSON: true}).then(function (res) {
          var json = res.body.data;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.rolelist = json;
        })
      },
      localData2(val) {
        this.$http.post('/list/user/list', {
          "pageNum": val == null ? null : val,
          "token": localStorage.CRM_token,
          "roleid": this.form.roleid == '' ? null : this.form.roleid,
          "status": this.form.status == '' ? null : this.form.status,
          "begintime": this.form.date1 == '' ? null : this.changeTime(this.form.date1),
          "endtime": this.form.date2 == '' ? null : this.changeTime(this.form.date2),
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.tableData3 = json;
          if (this.tableData3 != null) {
            this.tableData3.forEach(function (o) {
              if (o.userstatus == 0) {
                o.userstatus = '禁止使用';
              } else {
                o.userstatus = '正常使用'
              }
            });
          }
          this.totalCount = res.body.data.total;
          this.currentPage = res.body.data.pageNum;
          this.loading = false;
        })
      },
      message(msg, msg_type) {
        this.$message({
          message: msg,
          type: msg_type
        });
      },
      changeTime(time) {
        console.log("--" + time)
        var newTime = new Date(time);
        var yy = newTime.getFullYear();
        var mm = newTime.getMonth() + 1;
        var dd = newTime.getDate();
        return (yy + "-" + mm + "-" + dd)
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
        if (newVal[4].childList[0].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[4].childList[0].map;
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
