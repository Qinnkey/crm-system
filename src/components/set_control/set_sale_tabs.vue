<template>
  <div class="set_tabs">
    <main_component @limititem="limititem">
      <breadcrumb_component></breadcrumb_component>
      <!--交易tabs信息-->
      <div class="set_info">
        <el-tabs v-model="activeName" type="card" label-width="180px" class="demo-ruleForm" @tab-click="handleClick">
          <el-tab-pane label="续费提醒" name="renew">
            <!--尾款交易tab-->
            <div class="set_info">
              <el-form v-model="renewremind" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="提醒类型：" prop="salebusicodename">
                      <el-input type="text" v-model="ruleForm2.salebusicodename" auto-complete="off"
                                :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="提醒时间(天)：" prop="saleremindtimespan">
                      <el-input type="text" v-model="renewremind.saleremindtimespan" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="limitCtrl.subBtn==1" :span="24">
                    <el-form-item label-width="120px">
                      <el-button type="success" @click="submitRenewForm('ruleForm2')">提交</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>

        </el-tabs>
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
        activeName: 'renew',
        renewremind: [],	//续费提醒
        saleid: localStorage.CRM_keyid,
        //"{"data":[{"remindid":6,"busicode":1,"remindtimespan":60,"createby":0,"createdate":"2017-07-21 15:21:27","updateby":0,"updatedate":"2017-07-21 18:14:45","standby1":"","standby2":""}],"code":"100","msg":"成功"}"
        ruleForm2: {
          saleremindid: '',				//id
          salebusicode: '',				//提醒编码
          saleremindtimespan: '',			//时间跨度
          salebusicodename: "续费提醒",
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
            var url = '/list/saleremSetController/saveOrUpd';
            var json = {
              saleremindid: this.renewremind.saleremindid,
              salebusicode: 1,
              saleremindtimespan: this.renewremind.saleremindtimespan
            };
            this.getSubmit(url, json);
            this.$router.go(0);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //加载tabs列表编码:1续签提醒;2员工转正;3生日
      loadTabs(type) {
        this.$http.get('/list/saleremSetController/list?saleid=' + this.saleid + "&salebusicode=" + type).then(function (res) {
          //加载json对象，如果是json字符串要eval()转成json对象
          if (res.body.data == '') {
            return;
          }
          this.renewremind = res.body.data[0];
        })
      },
      getSubmit(url, json) {
        this.$http.get(url, {params: json}).then(function (res) {
        })
      },
      handleClick() {

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
         console.log("sale_tabs");
        if (newVal[5].childList[1].childstatus == 0) {
          this.$router.push({path: "/login"})
        }
        this.limitCtrl = newVal[5].childList[1].map;
        console.log(this.limitCtrl, "5555")
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
    /*border: 1px solid #CCCCCC;*/
    border-radius: 5px;
  }
</style>
