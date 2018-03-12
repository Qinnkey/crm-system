<template>
  <div class="user_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item v-if="limitCtrl.searchBtn==1">
                <el-select v-model="form.searchType" placeholder="请选择">
                  <el-option label="全部客户" value=""></el-option>
                  <el-option label="客户手机号" value="2"></el-option>
                  <el-option label="客户名称" value="3"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item v-if="limitCtrl.searchBtn==1">
                <el-input v-model="form.typevalue" placeholder="请输入查询值"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="limitCtrl.searchBtn==1" type="success" icon="search" @click="search">查找</el-button>
                <el-button v-if="limitCtrl.addBtn==1" type="success" icon="plus" @click="add">添加</el-button>
                <el-button type="success" icon="plus" @click="onSubmit">抢单</el-button>
              </el-form-item>
            </el-col>
            <el-col v-if="limitCtrl.importBtn==1" :span="5" :offset="7">
              <el-upload :on-success="handlesuccess" :before-upload="beforeAvatarUpload" :data="token"  :show-file-list="false"
                         action="/list/bigcustomer/importExcel">
                <el-button type="primary">大客户导入</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form>
        <!--表格块-->
        <el-table :data="tableData3" border style="width: 100%" height="460" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width"></el-table-column>

          <el-table-column label="操作" width="calc(100% - 950px)">

            <template scope="scope">
              <el-button v-if="limitCtrl.updateBtn==1" type="text" size="small"
                         @click="user_modifu(scope.$index, scope.row)">修改
              </el-button>
              <el-button v-if="limitCtrl.ableFun==1" type="text" size="small"
                         @click="user_disabled(scope.$index, scope.row)">
                <p v-if="scope.row.bigcontstatus==1">禁用</p>
                <p v-if="scope.row.bigcontstatus==2">启用</p>
              </el-button>
              <el-button v-if="limitCtrl.detailFun==1" type="text" size="small"
                         @click="user_detail(scope.$index, scope.row)">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="change flex_between" style="margin-top: 20px;">
          <!--<el-form v-if="limitCtrl.okBtn==1" :inline="true" class="demo-form-inline">
            <el-form-item label="将客户指派给">
              <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch"
                               placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-button style="margin: 0 10px;" type="success" @click="onSubmit">确认</el-button>
            </el-form-item>
          </el-form>-->
          <!--<el-col :span="2">
                        <el-button type="success" @click="submit">提交</el-button>
                    </el-col>-->
          <!--分页器-->
          <div class="inline_block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="current_page" :page-sizes="[10, 20, 50, 100]" :page-size="10"
                           layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
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
    name: 'user_list',
    data() {
      return {
      	token:'',
        restaurants: [],
        state1: '',
        state2: '',
        saleid: '',
        salename: '',
        form: {
          searchType: '',
          typevalue: '',
          custstatus: '',
          begindate: '',
          endDate: '',
        },
        table_list: [{
          name: '序号',
          prop: 'index',
          width: '120'
        },
          {
            name: '客户姓名',
            prop: 'bigcontact',
            width: '150'
          },
          {
            name: '手机号',
            prop: 'bigphone',
            width: '150'
          },
          {
            name: '公司名称',
            prop: 'bigcompanyname',
            width: '250'
          },
          {
            name: '公司地址',
            prop: 'bigaddress',
            width: '250'
          },
          {
            name: '用户状态',
            prop: 'bigcontstatusname',
            width: '120',
          },
        ],
        tableData3: [],
        //定义列表总数
        totalCount: 0,
        //定义当前页
        current_page: 1,
        //定义每页条数
        pageSize: 10,
        //select值
        tradetype: null,
        //用来存放选中的对象的
        selectObject: [],
        //大客户id数组
        bigIds: [],

        limitCtrl: {},		//权限控制
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
    	this.saleid = localStorage.CRM_keyid?localStorage.CRM_keyid:'';
      this.loadData();
      this.loadAll();
      this.token={"token":localStorage.CRM_token};
    },
    methods: {
      //搜索,点击搜索的是够后台返回数据
      reload: function(text) {
				if(text == 1) {
					this.loadData();
				}
			},
      search() {
        this.loadData();
      },
      //业务员状态：1，正常；2，禁用
      formatter(row, column) {
        console.log(row.bigcontstatus);
        if (row.bigcontstatus == '1') {
          return "正常";
        } else {
          return "禁用";
        }
      },
      //添加
      add() {
        this.$router.push({path: '/big_customers_add'})
      },
      //客户导入
      customer_import() {
        console.log("客户导入")
      },
      //加载数据
      loadData() {
        var bigContact = '';
        var bigPhone = '';
        if (this.form.searchType == 2) {
          bigPhone = this.form.typevalue;
        }
        if (this.form.searchType == 3) {
          bigContact = this.form.typevalue;
        }
        this.$http.get("/list/bigcustomer/list", {
          params: {
            bigSaleStatus: 1,
            bigPhone: bigPhone,
            bigContact: bigContact,
            pageNum: this.current_page,
            pageSize: this.pageSize
          }
        }).then(function (res) {
          if (res != null && res.body.data != null && res.body.data.list.length > 0) {
            var json = res.body.data.list;
            this.tableData3 = json;
            this.totalCount = res.body.data.total;
            this.current_page = res.body.data.pageNum;
            for (var i = 0; i < this.tableData3.length; i++) {
              this.tableData3[i].index = i + 1;
              if (this.tableData3[i].bigcontstatus == '1') {
                this.tableData3[i].bigcontstatusname = '正常';
              } else {
                this.tableData3[i].bigcontstatusname = '禁用';
              }
            }
          } else {
            this.tableData3 = []
          }
        })
      },
      //列表选择
      handleSelectionChange(val) {
        this.selectObject = val;
        var idArr = [];
        for (var i = 0; i < val.length; i++) {
          console.log(val[i].bigid);
          idArr.push(val[i].bigid);
        }
        this.bigIds = idArr;
      },
      //列表-修改-操作功能事件
      user_modifu(index, row) {
        console.log(index, row)
        this.$router.push({path: '/big_customers_modifu', query: {bigid: row.bigid}})
      },
      //列表-禁用-操作功能，相当于局部的刷新效果
      user_disabled(index, row) {
        //大客户状态标志：1，正常；2，禁用
        var bigStatus = 1;
        if (row.bigcontstatus == 1) {
          bigStatus = 2;
        }
        this.$http.get("/list/bigcustomer/status", {
          params: {
            bigId: row.bigid,
            bigStatus: bigStatus
          }
        }).then(function (res) {
          if (res.body.code == 100) {
            this.loadData();
          }
        })
      },
      //列表-查看详情-操作功能事件
      user_detail(index, row) {
        console.log(index, row)
        this.$router.push({path: '/big_customers_detail', query: {bigid: row.bigid}})
      },
      
      onsubmittot(){
      	console.log("qiangdna");
      },
      //指派确认
      onSubmit() {
        console.log("确认");
        if (this.bigIds.length == 0) {
          this.$message({
            message: '请选择客户',
            type: 'error',
            duration: 2000,
          });
          return;
        }
        if(this.saleid == ''||'null'==this.saleid ){
        	this.$message({
            message: '非业务员，不能抢单！',
            type: 'error',
            duration: 2000,
          });
          return;
        }
        var json = {bigIds: this.bigIds, saleId: this.saleid, saleName: this.salename, bigSaleStatus: 1};
        console.log(json);
        this.$http.post("/list/bigcustomer/allocate", json, {emulateJSON: true}).then(function (res) {
//        this.$router.go(0);
					this.loadData();
        })
      },
      //currentPage 改变时会触发
      handleCurrentChange(val) {
        this.current_page = val;
        if(this.tableData3.length>0){
        		 this.loadData();
        }
       			
      },
      handleSizeChange(val) {
        this.pageSize = val;
        if(this.tableData3.length>0){
        		this.loadData();
        }
        		
      },
      //业务员查询
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        this.$http.get("/list/salesman/findSaleAll").then(function (res) {
          //加载json对象
          this.restaurants = res.body.data;
        })
      },
      /*handleSelect(item) {
        this.saleid = item.saleid;
        this.salename = item.salename;
        //console.log(item);
      },*/
      //用于上传文件的预览工作
      handlePreview(file) {
        console.log(file);
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
        if (newVal[2].childList[0].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[2].childList[0].map;
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
