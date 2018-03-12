<template>
  <div class="menu_add">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="menu_info">
        <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="资源名称：" prop="sourcesname">
                <el-input type="text" placeholder="请输入资源名称" v-model="menuForm.sourcesname"
                          auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="资源URL：" prop="url">
                <el-input type="text" placeholder="请输入资源URL" v-model="menuForm.url" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="页面绑定码" prop="target">
                <el-input type="text" placeholder="请输入资源名称" :disabled="isdisabled" v-model="menuForm.target"
                          auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="主菜单：" prop="fatherid">
                <el-select v-model="menuForm.fatherid" :disabled="isdisabled" placeholder="所属主菜单"
                           @change="loadData3(menuForm.fatherid)">
                  <el-option v-for="item in tableData2" :key="tableData2" :label="item.menuname" :value="item.menuid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="子菜单：" prop="sourcesid">
                <el-select v-model="menuForm.sourcesid" :disabled="isdisabled" placeholder="所属子菜单">
                  <el-option v-for="item in tableData1" :key="item.menuid" :label="item.menuname" :value="item.menuid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label-width="100px">
                <el-button type="success" @click="submitForm('menuForm')">提交</el-button>
                <el-button v-if="!isdisabled" @click="resetForm('menuForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </main_component>

  </div>

</template>

<script>
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: 'menu_add',
    data() {
      return {
        menuForm: {
          sourcesname: '',				//菜单名称
          url: '',				//菜单对应的url
          fatherid: "",				//如果为子菜单，应该有对应的父菜单
          sourcesid: '',
          target: '',
        },
        isdisabled: false,
        tableData2: [],   //主菜单
        tableData1: [],   // 子菜单
        rules: {
          sourcesname: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
            {max: 255, message: '长度在5 到 255 个字符', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '请输入菜单URL地址', trigger: 'blur'},
            {max: 255, message: '长度在5 到 255 个字符', trigger: 'blur'}
          ],
          target: [
            {required: true, message: '请输入页面绑定码', trigger: 'blur'},
            {max: 255, message: '长度在5 到 255 个字符', trigger: 'blur'}
          ],
          sourcesid: [
            {required: true, message: '请选择菜子单类别', trigger: 'change', type: 'number'}
          ],
          fatherid: [
            {required: true, message: '请选择主菜单类别', trigger: 'change', type: 'number'}
          ],
        },

      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      this.petname = localStorage.CRM_petname;
      this.loadData2();
      if (this.$route.query.itemid != null) {
        this.loadData(this.$route.query.itemid);
      }
    },
    methods: {
      submitForm(formName) {
        if (this.$route.query.itemid != null) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/list/sources/update', {
                "token": localStorage.CRM_token,
                "sourcesid": this.$route.query.itemid,
                "sourcesname": this.menuForm.sourcesname,
                "url": this.menuForm.url,
                'target': this.menuForm.target,
              }, {emulateJSON: true}).then(function (res) {
                if (res.body.code == 100) {
                  this.message("更新成功！", 'success');
                  this.$router.push({path: "/sources_list"});
                  this.$emit('reload', 1);
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/list/sources/save', {
                "token": localStorage.CRM_token,
                "sourcesname": this.menuForm.sourcesname,
                "url": this.menuForm.url,
                "menuid": this.menuForm.sourcesid,
                'target': this.menuForm.target,
              }, {emulateJSON: true}).then(function (res) {
                if (res.body.code == 100) {
                  this.message("插入成功！", 'success');
                  this.$refs[formName].resetFields();
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loadData(sourcesid) {
        this.$http.post('/list/sources/getone', {"sourcesid": sourcesid}, {emulateJSON: true}).then(function (res) {
          var json = res.body.data;
          this.menuForm.sourcesname = json.sourcesname;
          this.menuForm.url = json.url;
          this.menuForm.fatherid = json.mainmenuid;
          this.menuForm.sourcesid = json.menuid;
          this.menuForm.target = json.target;
          this.isdisabled = true;
        })
      },
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

      message(msg, msg_type) {
        this.$message({
          message: msg,
          type: msg_type
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
        if (newVal[4].childList[3].map.addBtn == 0) {
          this.$router.push({path: "/login"})
        }
      }
    },
  }
</script>

<style scoped="scoped">
  .menu_info {
    background: white;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 30px;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
  }
</style>
