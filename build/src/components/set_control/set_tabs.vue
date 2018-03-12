<template>
  <div class="set_tabs">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <!--交易tabs信息-->
      <div class="set_info">
        <el-tabs v-model="activeName" type="card" label-width="100px" class="demo-ruleForm" @tab-click="handleClick">
          <el-tab-pane label="续费提醒" name="renew">
            <!--尾款交易tab-->
            <div class="set_info">
              <el-form v-model="renewremind" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                <el-col :span="9">
                  <el-form-item label="提醒类型：" prop="busicoderenewname">
                    <el-input type="text" v-model="ruleForm2.busicoderenewname" auto-complete="off"
                              :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="提醒时间(天)：" prop="remindtimespan">
                    <el-input type="text" v-model="renewremind.remindtimespan" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="limitCtrl.subBtn==1" :span="24">
                  <el-form-item label-width="120px">
                    <el-button type="success" @click="submitRenewForm('ruleForm2')">提交</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane label="转正提醒" name="positive">
            <!--续费记录tab-->
            <div class="set_info">
              <el-form v-model="positiveremind" :rules="rules" ref="ruleForm2" label-width="120px"
                       class="demo-ruleForm">
                <el-col :span="9">
                  <el-form-item label="提醒类型：" prop="busicodeposiname">
                    <el-input type="text" v-model="ruleForm2.busicodeposiname" auto-complete="off"
                              :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="提醒时间(天)：" prop="remindtimespan">
                    <el-input type="text" v-model="positiveremind.remindtimespan" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="limitCtrl.subBtn==1" :span="24">
                  <el-form-item label-width="120px">
                    <el-button type="success" @click="submitPositiveForm('ruleForm2')">提交</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>
    </main_component>
    <router-view></router-view>
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
        activeName: 'renew',
        renewremind: [],	//续费提醒
        positiveremind: [],	//转正提醒
        //"{"data":[{"remindid":6,"busicode":1,"remindtimespan":60,"createby":0,"createdate":"2017-07-21 15:21:27","updateby":0,"updatedate":"2017-07-21 18:14:45","standby1":"","standby2":""}],"code":"100","msg":"成功"}"
        ruleForm2: {
          remindid: '',				//id
          busicode: '',				//提醒编码
          remindtimespan: '',			//时间跨度
          busicoderenewname: "续费提醒",
          busicodeposiname: "转正提醒"
        },
        rules: {
          remindtimespan: [
            {type: 'number', min: 1, max: 12, message: '请输入数字', trigger: 'blur'}
          ]
        },
        limitCtrl: {},		//权限控制
      }
    },
    components: {
      main_component,
      breadcrumb_component
    },
    created: function () {
      this.loadTabs(1);
      this.petname = localStorage.CRM_petname;
    },
    methods: {
      change_salesman() {
        console.log("更改业务员")
      },
      submitRenewForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = '/list/remindSetController/saveOrUpd';
            var json = {
              remindid: this.renewremind.remindid,
              busicode: 1,
              remindtimespan: this.renewremind.remindtimespan
            };
            this.getSubmit(url, json);
            this.$router.go(0);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitPositiveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = '/list/remindSetController/saveOrUpd';
            var json = {
              remindid: this.positiveremind.remindid,
              busicode: 2,
              remindtimespan: this.positiveremind.remindtimespan
            };
            console.log(json);
            this.getSubmit(url, json);
            this.$router.go(0);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //tab切换
      handleClick(tab, event) {
        if (tab.name == 'renew') {
          this.loadTabs(1);
        }
        if (tab.name == 'positive') {
          this.loadTabs(2);
        }
      },
      //加载tabs列表编码:1续签提醒;2员工转正;3生日
      loadTabs(type) {
        this.$http.get('/list/remindSetController/list?busicode=' + type).then(function (res) {
          //加载json对象，如果是json字符串要eval()转成json对象
          if (res.body.data == '') {
            return;
          }
          if (type == 1) {
            this.renewremind = res.body.data[0];
          }
          if (type == 2) {
            this.positiveremind = res.body.data[0];
          }
        })
      },
      getSubmit(url, json) {
        this.$http.get(url, {params: json}).then(function (res) {
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
        console.log("tabs");
        if (newVal[5].childList[0].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[5].childList[0].map;
        console.log(newVal[5].childList[0], "5553335")
      }
    }
  }
</script>

<style scoped="scoped">
  .el-button--success {
    background: #2EB398;
    border-color: #2EB398;
  }

  .set_tabs {
    padding: 20px;
    margin-top: 0px;
  }

  .set_info {
    background: white;
    padding: 20px 10px;
    border-radius: 5px;
  }
</style>
