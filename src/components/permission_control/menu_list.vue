<template>
  <div class="menu_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-col v-if="limitCtrl.searchBtn==1" :span="2">
            <el-button type="" @click="loadData(null)">主菜单信息</el-button>
          </el-col>
          <el-col v-if="limitCtrl.searchBtn==1" :span="4">
            <el-form-item prop="menuid">
              <el-select v-model="form.menuid" placeholder="请选择所属主菜单">
                <el-option v-for="item in menulist" :key="item.menuid" :label="item.menuname" :value="item.menuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-form-item label-width="80px">
            <el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search(form.menuid)">查找
            </el-button>
            <el-button v-if="limitCtrl.addBtn==1" type="info" icon="plus" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
        <!--表格块-->
        <el-table :data="tableData3" border style="width: 100%" height="460" @selection-change="handleSelectionChange">
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width">
          </el-table-column>
          <el-table-column v-if="limitCtrl.updateFun==1" fixed="right" label="操作" width="calc(100% - 900px) ">
            <template scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <!--<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">禁用</el-button>-->
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
    name: 'menu_list',
    data() {
      return {
        form: {
          menuid: '',

        },
        renewal: '',		//续费
        table_list: [
          {name: '序号', prop: 'index', width: '100'},
//          {name: '菜单ID码', prop: 'menuid', width: '100'},
          {name: '菜单URL', prop: 'url', width: '250'},
          {name: '页面绑定码', prop: 'target', width: '200'},
          {name: '菜单名称', prop: 'menuname', width: '200'},
          {name: '是否主菜单', prop: 'menucode', width: '130'},
          {name: '所属菜单', prop: 'fathername', width: '200'},
        ],
        tableData3: [],
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
    },
    methods: {
      reload: function (text) {
        if (text == 1) {
          this.loadData(this.currentPage);
        }
      },
      //搜索
      search(id) {
//        console.log(id);
        this.$http.post('/list/menu/childmenu', {
          "token": localStorage.CRM_token,
          "fatherid": id
        }, {emulateJSON: true}).then(function (res) {
          if (res.body.code == 100) {
            var json = res.body.data.list;
            //加载json对象，如果是json字符串要eval()转成json对象
            this.tableData3 = json;
            console.log(this.tableData3);
            this.totalCount = res.body.data.total;
            this.currentPage = res.body.data.pageNum;
            if (this.tableData3 != null) {

              for (var i = 0; i < this.tableData3.length; i++) {
                this.tableData3[i].index = i + 1;
              }

              this.tableData3.forEach(function (o) {
                if (o.menucode == 0) {
                  o.menucode = '否';
                } else {
                  o.menucode = '是'
                }
              });
            }
          }
        })
      },
      //添加
      add() {
        this.$router.push({path: "/menu_list/add"})
      },
      //列表选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      //列表操作功能事件
      handleEdit(index, row) {
//        console.log(index, row.menuid);
        this.$router.push({path: "/menu_list/add", query: {itemid: row.menuid}})
      },
      //页码改变触发
      handleSizeChange(val) {
        console.log('每页 ' + val + ' 条');
      },
      //currentPage 改变时会触发
      handleCurrentChange(val) {
        console.log('当前页:' + val);
        this.loadData(val);
      },
      //后台获取菜单数据
      loadData(val) {
//        console.log(val);
        this.$http.post('/list/menu/mainmenu', {
          "token": localStorage.CRM_token,
          "pageNum": val == null ? null : val
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.tableData3 = json;
          this.menulist = json;
          this.totalCount = res.body.data.total;
          this.currentPage = res.body.data.pageNum;

          for (var i = 0; i < this.tableData3.length; i++) {
            this.tableData3[i].index = i + 1;
          }

          this.tableData3.forEach(function (o) {
            if (o.menucode == 0) {
              o.menucode = '否';
            } else {
              o.menucode = '是'
            }
          });
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
        if (newVal[4].childList[2].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[4].childList[2].map;
        console.log(this.limitCtrl, "55")
      }
    }
  }
</script>

<style>

</style>
