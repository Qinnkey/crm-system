<template>
  <div class="menu_add">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <div class="menu_info">
        <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="9">
              <el-form-item label="菜单名称：" prop="menuname">
                <el-input type="text" v-model="menuForm.menuname" placeholder="请输入菜单名称" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="菜单URL：" prop="url">
                <el-input type="text" v-model="menuForm.url" placeholder="请输入菜单URL" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="页面绑定码" prop="target">
                <el-input type="text" :disabled="isdisabled" placeholder="请输入页面绑定码" v-model="menuForm.target"
                          auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="菜单类别：" prop="menucode">
                <el-radio-group v-model="menuForm.menucode">
                  <el-radio v-for="item in menu_type" :disabled="isdisabled" :label="item.label" :value="item.value"
                            :key="item.value"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="menuForm.menucode=='子菜单'">
              <el-form-item label="所属菜单：" prop="fatherid">
                <el-select v-model.number="menuForm.fatherid" :disabled="isdisabled" placeholder="请选择所属主菜单">
                  <el-option v-for="item in menulist" :key="item.menuname" :label="item.menuname"
                             :value="item.menuid"></el-option>
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
        menu_type: [
          {label: '主菜单', value: 1},
          {label: '子菜单', value: 0}
        ],
        menuForm: {
          menuname: '',				//菜单名称
          url: '',				//菜单对应的url
          fatherid: "",				//如果为子菜单，应该有对应的父菜单
          menucode: '',
          target: '',
        },
        menulist: '',
        isdisabled: false,
        rules: {
          menuname: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
            {max: 255, message: '长度在5 到 255 个字符', trigger: 'blur'}
          ],
          target: [
            {required: true, message: '请输入页面绑定码', trigger: 'blur'},
            {max: 255, message: '长度在5 到 255 个字符', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '请输入菜单URL地址', trigger: 'blur'},
            {max: 255, message: '长度在5 到 255 个字符', trigger: 'blur'}
          ],
          menucode: [
            {required: true, message: '请选择菜单类别', trigger: 'blur'}
          ],
          fatherid: [
            {required: true, message: '请选择属菜单', trigger: 'change', type: 'number'}
          ],
        }
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      console.log(this.$route.query.itemid)
      this.petname = localStorage.CRM_petname;
      this.loadData();
      if (this.$route.query.itemid != null) {
        this.loadData2(this.$route.query.itemid);
      }
    },
    methods: {
      submitForm(formName) {
        console.log(formName);
        if (this.$route.query.itemid != null) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/list/menu/update', {
                "token": localStorage.CRM_token,
                "menuname": this.menuForm.menuname,
                "url": this.menuForm.url,
                "menuid": this.$route.query.itemid,
                'target': this.menuForm.target,
              }, {emulateJSON: true}).then(function (res) {
                if (res.body.code == 100) {
                  this.message("修改成功！", 'success');
                  this.$router.push({path: "/menu_list"});
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
              this.$http.post('/list/menu/save', {
                "token": localStorage.CRM_token,
                "menuname": this.menuForm.menuname,
                "url": this.menuForm.url,
                "fatherid": this.menuForm.fatherid,
                'target': this.menuForm.target,
                "menucode": this.menuForm.menucode == '子菜单' ? 0 : 1
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
      loadData() {
        this.$http.post('/list/menu/mainmenu', {"token": localStorage.CRM_token}, {emulateJSON: true}).then(function (res) {
          var json = res.body.data.list;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.menulist = json;
        })
      },
      loadData2(menuid) {
        this.$http.post('/list/menu/getone', {
          "token": localStorage.CRM_token,
          "menuid": menuid
        }, {emulateJSON: true}).then(function (res) {
          var json = res.body.data;
          //加载json对象，如果是json字符串要eval()转成json对象
          this.menuForm = json;
          if (json.menucode == 1) {
            this.menuForm.menucode = '主菜单';
          } else {
            this.menuForm.menucode = '子菜单';
          }
          this.isdisabled = true;
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
        if (newVal[4].childList[2].map.addBtn == 0) {
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
