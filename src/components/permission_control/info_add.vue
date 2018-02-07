<template>
  <div class="menu_add">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="menu_info">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="9">
              <el-form-item label="账号：" prop="username">
                <el-input type="text" placeholder="请输入账号" :disabled="isdisabled" v-model="userForm.username"
                          auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="昵称：" prop="petname">
                <el-input type="text" v-model="userForm.petname" placeholder="请输入昵称" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="角色：" prop="roleid">
                <el-select v-model.number="userForm.roleid" placeholder="请选择角色">
                  <el-option v-for="item in rolelist" :key="item.roleid" :label="item.rolename"
                             :value="item.roleid"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" v-if="isdisabled">
              <el-form-item label="密码：" prop="password">
                <el-input type="text" v-model="userForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label-width="100px">
                <el-button type="success" @click="submitForm('userForm')">提交</el-button>
                <el-button v-if="!isdisabled" @click="resetForm('userForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </main_component>
    <router-view></router-view>
  </div>

</template>

<script>
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: 'menu_add',
    data() {
      return {
        userForm: {
          username: '',				//用户账号
          petname: '',				//昵称
          roleid: '',				//对应权限id
          password: '',
          token: localStorage.CRM_token,
        },
        isdisabled: false,
        rolelist: [],
        rules: {
          username: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在6 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在6 到 15 个字符', trigger: 'blur'}
          ],
          petname: [
            {required: true, message: '请输入用户昵称', trigger: 'blur'},
            {max: 100, message: '长度在100字符之内', trigger: 'blur'}
          ],
          roleid: [
            {required: true, message: '请选择角色', trigger: 'change', type: 'number'}
          ],
        }
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      this.petname = localStorage.CRM_petname;
      this.localData();
      if (this.$route.query.itemid != null) {
        this.userForm.username = this.$route.query.username;
        this.userForm.petname = this.$route.query.petname;
        this.userForm.password = '';
        this.userForm.roleid = this.$route.query.roleid;
        this.isdisabled = true;
      }
    },
    methods: {
      submitForm(formName) {
        if (this.$route.query.itemid != null) {
          //更新
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/list/user/update', {
                "token": localStorage.CRM_token,
                "userid": this.$route.query.itemid,
                "petname": this.userForm.petname,
                "password": this.userForm.password
              }, {emulateJSON: true}).then(function (res) {
                if (res.body.code == 100) {
                  this.message("更新成功！", 'success');
//                  location.reload();
                  this.$router.push({path: "/info_list"})
                  this.$emit('reload', 1);
                } else {
                  this.message(res.body.msg, 'error');
                }
              });
            }
          })
        } else {
          // 添加
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/list/user/save', this.userForm, {emulateJSON: true}).then(function (res) {
                if (res.body.code == 100) {
                  this.message("插入成功！", 'success');
                  this.$refs[formName].resetFields();
                } else {
                  this.message(res.body.msg, 'error');
                }
              });
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
      localData() {
        this.$http.post('/list/role/list', {"token": localStorage.CRM_token}, {emulateJSON: true}).then(function (res) {
          var json = res.body.data;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.rolelist = json;
        })
      },
      message(msg, msg_type) {
        this.$message({
          message: msg,
          type: msg_type
        });
      },
      limititem(val) {
        var newVal = [];
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < val.length; j++) {
            if (val[j].menutarget == i + 1) {
              newVal.push(val[j])
            }
          }
        }
        if (newVal[4].childList[0].map.addBtn == 0) {
          this.$router.push({path: "/login"})
        }
      }
    }
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
