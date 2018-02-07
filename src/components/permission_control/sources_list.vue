<template>
  <div class="sources_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row>
            <el-col v-if="limitCtrl.searchBtn==1" :span="4">
              <el-form-item>
                <el-select v-model="form.fatherid" placeholder="请选择所属主菜单" @change="loadData3(form.fatherid)">
                  <el-option v-for="item in tableData2" :key="item.menuid" :label="item.menuname" :value="item.menuid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="limitCtrl.searchBtn==1" :span="4">
              <el-form-item>
                <el-select v-model="form.sourcesid" placeholder="请选择所属子菜单">
                  <el-option v-for="item in tableData1" :key="item.menuid" :label="item.menuname" :value="item.menuid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label-width="80px">
              <el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search(form.sourcesid)">查找
              </el-button>
              <el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">添加</el-button>
            </el-form-item>
          </el-row>
        </el-form>

        <!--表格块-->
        <el-table :data="tableData3" border style="width: 100%" height="460" @selection-change="handleSelectionChange">
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width">
          </el-table-column>
          <el-table-column v-if="limitCtrl.updateFun==1" fixed="right" label="操作" width="calc(100% - 900px) ">
            <template scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="renewal" style="margin-top: 20px;">
          <!--分页器-->
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
    name: 'sources_list',
    data() {
      return {
        form: {
          fatherid: '',
          sourcesid: '',

        },
        renewal: '',		//续费
        table_list: [
          {name: '序号', prop: 'index', width: '100'},
//          {name: '资源ID码', prop: 'sourcesid', width: '200'},
          {name: '资源URL', prop: 'url', width: '350'},
          {name: '页面绑定码', prop: 'target', width: '300'},
          {name: '资源名称', prop: 'sourcesname', width: '250'},
        ],
        tableData3: [],
        tableData2: [],   //主菜单
        tableData1: [],   // 子菜单
        multipleSelection: [],
        //定义列表总数
        totalCount: 0,
        //定义当前页
        currentPage: 0,
        //定义每页条数
//        pageSize: 10,
        menulist: '',
        limitCtrl: {},		//权限控制
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      this.petname = localStorage.CRM_petname;
      this.loadData(null);
      this.loadData2();
    },
    methods: {
      reload: function (text) {
        if (text == 1) {
          this.loadData(this.currentPage);
        }
      },
      //搜索
      search(id) {
        console.log(id);
        this.$http.post('/list/sources/list2', {
          "token": localStorage.CRM_token,
          "menuid": id
        }, {emulateJSON: true}).then(function (res) {
          if (res.body.code == 100) {
            var json = res.body.data.list;
            //加载json对象，如果是json字符串要eval()转成json对象
            this.tableData3 = json;
            this.totalCount = res.body.data.total;
            this.currentPage = res.body.data.pageNum;
            for (var i = 0; i < this.tableData3.length; i++) {
              this.tableData3[i].index = i + 1;
            }
          }
        })
      },
      //添加
      add() {
        this.$router.push({path: "/sources_list/add"})
      },
      //列表选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      //列表操作功能事件
      handleEdit(index, row) {
        console.log(index, row.sourcesid);
        this.$router.push({path: "/sources_list/add", query: {itemid: row.sourcesid}})

      },
      //页码改变触发
      handleSizeChange(val) {
      },
      //currentPage 改变时会触发
      handleCurrentChange(val) {
        this.loadData(val);
      },
      //所有资源信息
      loadData(val) {
        console.log("当前传入的值为:" + val);
        this.$http.post('/list/sources/list', {
          "token": localStorage.CRM_token,
          "pageNum": val == null ? null : val
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          console.log(json);
          this.tableData3 = json;
          this.menulist = json;
          this.totalCount = res.body.data.total;
          this.currentPage = res.body.data.pageNum;
          for (var i = 0; i < this.tableData3.length; i++) {
            this.tableData3[i].index = i + 1;
          }
        })
      },
      //主菜单
      loadData2() {
        this.$http.post('/list/menu/mainmenu', {"token": localStorage.CRM_token}, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.tableData2 = json;
//          console.log("main menu" + this.tableData2)
//          this.tableData1 = [];
        })
      },
      //对应主菜单的子菜单信息
      loadData3(id) {
        console.log(id);
        this.$http.post('/list/menu/childmenu', {
          "token": localStorage.CRM_token,
          "fatherid": id
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.tableData1 = json;
          console.log(this.tableData1)
        })
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
        if (newVal[4].childList[3].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[4].childList[3].map;
      }
    }
  }
</script>

<style>

</style>
