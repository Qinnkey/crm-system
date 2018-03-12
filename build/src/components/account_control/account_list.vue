<template>
  <div class="account_list">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="table_list">
        <!--搜索区块-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="form.region1" placeholder="请选择">
                  <el-option label="全部客户" value=""></el-option>
                  <el-option label="客户名称" value="contact"></el-option>
                  <el-option label="项目名称" value="itemname"></el-option>
                  <el-option label="客户手机号" value="phone"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-input v-model="form.name" placeholder="请输入查询值"></el-input>
            </el-form-item>
            <el-form-item :span="7">
              <el-button  type="success" icon="search" @click="search">查找</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <!--表格块-->
        <el-table :data="tableData3" border height="460" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-for="item in table_list" :key="item.name" :prop="item.prop" :label="item.name"
                           :width="item.width"></el-table-column>
          <el-table-column label="操作" width="calc(100% - 975px)">
            <template scope="scope">
              <el-button  type="text" size="small"
                         @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button  type="text" size="small"
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
    name: 'account_list',
    data() {
      return {
      	check:false,
      	custids:[],
      	contact:'',
      	phone:'',
      	itemname:'',
        form: {
          name: '',
          region1: '',
        },
        table_list: [
          {name: '序号', prop: 'index', width: '70'},
          {name: '手机号', prop: 'phone', width: '200'},
          {name: '客户姓名', prop: 'contact', width: '150'},
          {name: '项目名称', prop: 'itemname', width: '200'},
          {name: '客户姓名', prop: 'contact', width: '150'},
          {name: '帐号类型', prop: 'accountypename', width: '150'},
          {name: '帐号', prop: 'username', width: '150'}, 
          {name: '密码', prop: 'password', width: '120'},
          {name: '创建人', prop: 'createbyName', width: '120'},
          {name: '其他', prop: 'comments', width: '200'},
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
      //加载列表数据
      loadData() {
//      this.loadDefault();
        var contact = '';
        var phone = '';
        var itemname = '';
        if (this.form.region1 == "contact") {
            contact = this.form.name;
          } else if (this.form.region1 == "phone") {
            phone = this.form.name;
          }else if (this.form.region1 == "itemname") {
            itemname = this.form.name;
          }
        this.$http.get('/list/itemAccountNumberController/index', {
            params: {
              	token: localStorage.CRM_token,
                contact: contact,
                phone: phone,
                itemname:itemname,
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
		          }
		          this.totalCount = res.body.data.total;
		          this.currentPage = res.body.data.pageNum;
          } else {
            this.tableData3 = []
          }
        })
      },
      handleSelectionChange(val) {
      	     this.check=false;
      	     this.custids=[];
        this.multipleSelection = val;
        for(var i=0; i<this.multipleSelection.length; i++){
        	if(this.multipleSelection[i].username!=null){
        		     this.check=true;
        	}else{
        		  this.custids.push(this.multipleSelection[i].custid);
        	}
        }
      },
      handleEdit(index, row) {
      	 this.$router.push({
		          path: '/itemAccountNumber_modifu',
		          query: {
		            token: localStorage.CRM_token,
		            accountid: row.accountid,
		            num:2
		          }
		        })
      },
      //客户信息修改
      handleDetail(index, row) {
      	 this.$router.push({
			          path: '/itemAccountNumber_detail',
			          query: {
			            token: localStorage.CRM_token,
			            accountid: row.accountid,
			            num:2
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
        if (newVal[9].childList[2].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[9].childList[2].map;
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
