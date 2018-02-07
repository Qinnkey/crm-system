<template>
  <div class="daily_list">
    <main_component @limititem="limititem">
      <!--<main_component>-->
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row>
            <!--<el-row>-->
            <el-col :span="2" v-if="limitCtrl.searchBtn==1">
              <el-form-item>
                <el-select v-model="form.dailyType" placeholder="日志种类">
                  <el-option label="日报" value="日报"></el-option>
                  <el-option label="周报" value="周报"></el-option>
                  <el-option label="月报" value="月报"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" v-if="limitCtrl.searchBtn==1">
              <el-form-item>
                <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" style="width: 100%;"
                                :picker-options="pickerOptions0"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3" v-if="limitCtrl.searchBtn==1">
              <el-form-item>
                <el-date-picker type="date" placeholder="结束日期" v-model="form.date2" style="width: 100%;"
                                :picker-options="pickerOptions0"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-form-item label-width="80px">
              <!--<el-button  type="success" icon="search" @click="search">查找</el-button>-->
              <!--<el-button  type="info" icon="plus" @click="add">添加</el-button>-->
              <el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search">查找</el-button>
              <el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">写日志</el-button>
            </el-form-item>
          </el-row>
        </el-form>

        <!--表格块-->
        <el-table :data="dailylist" border height="460" @selection-change="handleSelectionChange">
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width">
          </el-table-column>
          <el-table-column label="操作" width="calc(100% - 975px)">
            <template scope="scope">
              <!--<el-button v-if="limitCtrl.updateFun==1" type="text" size="small"-->
              <!--@click="handleEdit(scope.$index, scope.row)">评论-->
              <!--</el-button>-->
              <!--<el-button v-if="limitCtrl.detailFun==1" type="text" size="small"-->
              <!--@click="handleDetail(scope.$index, scope.row)">查看详情-->
              <!--</el-button>-->
              <el-button type="text" size="small" v-if="scope.row.status=='未查看'"
                         @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button type="text" size="small"
                         @click="handleDetail(scope.$index, scope.row)">查看
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
    name: 'daily_list',
    data() {
      return {
        //时间选择限定
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        form: {
          dailyType: '',
          date1: '',
          date2: '',
        },
        table_list: [
          {name: '序号', prop: 'index', width: '70'},
          {name: '提交人', prop: 'petname', width: '100'},
          {name: '日志类型', prop: 'type', width: '100'},
          {name: '报告时间', prop: 'createtime', width: '170'},
          {name: '在岗职位', prop: 'deptpost', width: '170'},
          {name: '完成工作', prop: 'complete', width: '200'},
          {name: '未完成工作', prop: 'uncomplete', width: '200'},
          {name: '需协调工作', prop: 'needhelp', width: '200'},
          {name: '审批人', prop: 'readername', width: '100'},
          {name: '审批状态', prop: 'status', width: '100'},
        ],
        dailylist: [],
//        templist: [],
        multipleSelection: [],
        //定义列表总数
        totalCount: 0,
        //定义当前页
        currentPage: 1,
        //定义每页条数
        pageSize: 10,
        limitCtrl: {},		//权限控制

        searchkey: '',
        timeout: null,
        restaurants: [],
        state4: '',
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      //初始化列表
      this.loadData();
//      this.loadData0();
    },
    methods: {
      reload(text) {
        if (text == 1) {
          this.loadData();
        }
      },
      //搜索
      search() {
        this.loadData(null);
      },
      add() {
        this.$router.push({path: "/my_daily_list/add"})
      },
      //加载列表数据
      loadData() {
        this.$http.post('/list/daily/mylist', {
//          "token": 51,
          "userid": localStorage.CRM_userid,
          "type": this.form.dailyType,
          "beginDate": this.form.date1 ? this.changeTime(this.form.date1) : null,
          "endDate": this.form.date2 ? this.changeTime(this.form.date2) : null,
          "pageNum": this.currentPage,
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          this.dailylist = json;
          console.log(this.dailylist)
          if (this.dailylist != null) {
            for (var i = 0; i < this.dailylist.length; i++) {
              this.dailylist[i].index = i + 1;
              this.dailylist[i].deptpost = this.dailylist[i].departname + "-" + this.dailylist[i].postname;
              if (this.dailylist[i].status == 0) {
                this.dailylist[i].status = '未查看';
              } else {
                this.dailylist[i].status = '已查看';
              }
            }
          }
          this.totalCount = res.body.data.total;
          this.currentPage = res.body.data.pageNum;
        })
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.searchkey = item.searchkey;
      },
      //----结束

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //员工信息修改页
      handleEdit(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/my_daily_list/update',
          query: {
            token: localStorage.CRM_token,
            dailyid: row.dailyid,
          }
        })
      },
      //员工信息详情页
      handleDetail(index, row) {
        console.log(index, row)
        this.$router.push({
          path: '/my_daily_list/update',
          query: {
            token: localStorage.CRM_token,
            dailyid: row.dailyid,
            read: true,
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
        if (this.dailylist.length > 0) {
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
        if (typeof(newVal[3].childList[2]) == 'undefined' || newVal[3].childList[2].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[3].childList[2].map;
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
