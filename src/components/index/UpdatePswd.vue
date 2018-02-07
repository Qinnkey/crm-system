<template>
  <div class="pswd_tabs">
    <main_component>
      <breadcrumb_component></breadcrumb_component>
      <div class="pswd_info">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
          <el-row>
            <el-col :span="9">
              <el-form-item label="新密码：" prop="pwd">
                <el-input type="text" v-model="userForm.pwd" placeholder="请输入密码" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label-width="100px">
                <el-button type="success" @click="submitForm('userForm')">提交</el-button>
                <el-button @click="resetForm('userForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </main_component>
  </div>
</template>
<script>
  import top_component from '@/components/module/component_top'
  import nav_left_component from '@/components/module/component_left'
  import main_component from '@/components/module/component_main'
  import breadcrumb_component from '@/components/module/component_Breadcrumb'

  export default {
    name: "add_user",
    data() {
      return {
        userForm: {
          pwd: '',
        },
        rules: {
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在6 到 15 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
    },

    methods: {
      submitForm(formName) {
        console.log(this.userForm.pwd);
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$http.post('/list/user/update', {
              "userid": localStorage.CRM_userid,
              "password": this.userForm.pwd,
              "token": localStorage.CRM_token
            }, {emulateJSON: true}).then(function (res) {
              if (res.body.code == 100) {
                this.message("修改成功！", 'success');
                this.$router.go(-1);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      message(msg, msg_type) {
        this.$message({
          message: msg,
          type: msg_type
        });
      },
    }
  }
</script>

<style scoped="scoped">
  .pswd_tabs {
    padding: 20px;
    margin-top: 0px;
  }

  .pswd_info {
    background: white;
    padding: 20px 10px;
    /*border: 1px solid #CCCCCC;*/
    border-radius: 5px;
  }
</style>
