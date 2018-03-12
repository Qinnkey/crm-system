import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

import Login from '@/components/login/Login'
import HSLogin from '@/components/hs_login/HSLogin'
import modifyPassword from '@/components/hs_login/modify_password'
import Index from '@/components/index/index'
import User_list from '@/components/user_control/user_list'
import User_add from '@/components/user_control/user_add'
import User_modifu from '@/components/user_control/user_modifu'
import User_list_detail from '@/components/user_control/user_list_detail'
import User_record from '@/components/user_control/user_record'
import User_trade from '@/components/user_control/user_trade'
import Salesman_list from '@/components/user_control/salesman_list'
import Salesman_add from '@/components/user_control/salesman_add'
import Salesman_modifu from '@/components/user_control/salesman_modifu'
import Salesman_detail from '@/components/user_control/salesman_detail'
import After_sales from '@/components/user_control/after_sales'
import After_sales_add from '@/components/user_control/after_sales_add'
import After_sales_modifu from '@/components/user_control/after_sales_modifu'
import After_sales_log from '@/components/user_control/after_sales_log'
import Continue_fee from '@/components/user_control/continue_fee'
import Continue_fee_modifu from '@/components/user_control/continue_fee_modifu'
import Continue_fee_record from '@/components/user_control/continue_fee_record'
import Continue_fee_detail from '@/components/user_control/continue_fee_detail'
import Customer_change from '@/components/user_control/customer_change'
import Customer_change_modifu from '@/components/user_control/customer_change_modifu'
import Customer_change_record from '@/components/user_control/customer_change_record'
import Customer_change_detail from '@/components/user_control/customer_change_detail'


import Trade_list from '@/components/trade_control/trade_list'
import Trade_add from '@/components/trade_control/trade_add'
import Trade_detail from '@/components/trade_control/trade_detail'
import Trade_tabs from '@/components/trade_control/trade_tabs'
import Trade_audit_list from '@/components/trade_control/trade_audit_list'
import Trade_list_detail from '@/components/trade_control/trade_list_detail'

import Big_customers from '@/components/directSelling_control/big_customers'
import Big_customers_add from '@/components/directSelling_control/big_customers_add'
import Big_customers_modifu from '@/components/directSelling_control/big_customers_modifu'
import Big_customers_record from '@/components/directSelling_control/big_customers_record'
import Big_customers_detail from '@/components/directSelling_control/big_customers_detail'

import Assigned_customer from '@/components/directSelling_control/assigned_customer'
import Assigned_customer_add from '@/components/directSelling_control/assigned_customer_add'
import Assigned_customer_modifu from '@/components/directSelling_control/assigned_customer_modifu'
import Assigned_customer_record from '@/components/directSelling_control/assigned_customer_record'
import Assigned_customer_detail from '@/components/directSelling_control/assigned_customer_detail'

import Ordered from '@/components/directSelling_control/ordered'
import Ordered_add from '@/components/directSelling_control/ordered_add'
import Ordered_modifu from '@/components/directSelling_control/ordered_modifu'
import Ordered_record from '@/components/directSelling_control/ordered_record'
import Ordered_detail from '@/components/directSelling_control/ordered_detail'

import Employee_list from '@/components/employee_control/employee_list'
import Organize_add  from '@/components/employee_control/organize_add'  

import Employee_add from '@/components/employee_control/employee_add'
import Employee_detail from '@/components/employee_control/employee_detail'
import Employee_update from '@/components/employee_control/employee_update'
import Permission from '@/components/permission_control/menu_list'
import Menu_add from '@/components/permission_control/menu_add'
import Info_list from '@/components/permission_control/info_list'
import Info_add from '@/components/permission_control/info_add'
import Permission_list from '@/components/permission_control/permission_list'
import Permission_add from '@/components/permission_control/permission_add'
import Sources_list from '@/components/permission_control/sources_list'
import Sources_add from '@/components/permission_control/sources_add'
import Set_tabs from '@/components/set_control/set_tabs'
import Set_sale_tabs from '@/components/set_control/set_sale_tabs'

import Pswd from '@/components/index/UpdatePswd'

import test from '@/components/Test'

import Hist_list from '@/components/user_control/hist_list'

import Daily_list from '@/components/employee_control/daily_list'
import Daily_detail from '@/components/employee_control/daily_detail'

import My_Daily_list from '@/components/employee_control/my_daily_list'
import My_Daily_add from '@/components/employee_control/my_daily_add'
import My_Daily_update from '@/components/employee_control/my_daily_update'

import Accident_list from '@/components/employee_control/accident_list'
import Accident_report_add from '@/components/employee_control/accident_report_add'
import Accident_report_update from '@/components/employee_control/accident_report_update'
import Accident_report_detail from '@/components/employee_control/accident_report_detail'

import Item_develop_list from '@/components/employee_control/item_develop_list'
import Item_develop_add from '@/components/employee_control/item_develop_add'
import Item_develop_update from '@/components/employee_control/item_develop_update'
import Item_develop_detail from '@/components/employee_control/item_develop_detail'

import User_pending from '@/components/user_control/user_pending_list'
import User_pending_modifu from '@/components/user_control/user_pending_modifu'
import User_pending_record from '@/components/user_control/user_pending_record'
import User_pending_trade from '@/components/user_control/user_pending_trade'
import User_pending_detail from '@/components/user_control/user_pending_detail'

import Service_list from '@/components/service_control/service_list'
import Service_detail from '@/components/service_control/service_detail'
import Service_reply from '@/components/service_control/service_reply'
import Service_reply_log from '@/components/service_control/service_reply_log'
import Item_require_change from '@/components/service_control/item_require_change'
import User_item_detail from '@/components/service_control/user_item_detail'

import Renew_trace from '@/components/renew_control/renew_list'
import Renew_add from '@/components/renew_control/renew_add'
import Renew_trace_suc from '@/components/renew_control/renew_trace_suc'
import Renew_add_suc from '@/components/renew_control/renew_add_suc'

import Training_list from '@/components/training_control/training_list'
import Training_add from '@/components/training_control/training_add'
import Training_detail from '@/components/training_control/training_detail'
import Training_item_add from '@/components/training_control/training_item_add'
import Training_update from '@/components/training_control/training_update'
import Invite_list from '@/components/training_control/invite_list'
import Invite_add from '@/components/training_control/invite_add'
import Invite_detail from '@/components/training_control/invite_detail'
import Invite_update from '@/components/training_control/invite_update'
import Trainingcourse_list from '@/components/training_control/trainingcourse_list'
import Trainingcourse_add from '@/components/training_control/trainingcourse_add'
import Trainingcourse_update from '@/components/training_control/trainingcourse_update'

import Account_statistics from '@/components/account_control/account_statistics'
import Account_supervise from '@/components/account_control/account_supervise'
import Customer_user_modifu from '@/components/account_control/customer_user_modifu'
import Customer_user_add from '@/components/account_control/customer_user_add'
import Customer_item from '@/components/account_control/customer_item'
import ItemAccountNumber_add from '@/components/account_control/itemAccountNumber_add'
import ItemAccountNumber_detail from '@/components/account_control/itemAccountNumber_detail'
import ItemAccountNumber_modifu from '@/components/account_control/itemAccountNumber_modifu'
import Account_list from '@/components/account_control/account_list'


import manageList from '@/components/manage_list/manage_list'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
		{ path:'/test', component: test },
		{ path:'*', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/user', name: '会搜账号管理系统', component: HSLogin },
    { path: '/modify_password', name: 'modify_password', component: modifyPassword },
    { path: '/manage_list', name: 'manage_list', component: manageList },
    { path: '/pwsd', name: '修改密码', component: Pswd },
    { path: '/index', name: '首页', component: Index },
    { path: '/user_list',  name: '用户管理', component: Index, children:[
    		{path: '/user_list',     name: '客户列表', component: User_list, children:[
    				{path: '/add',              name:"客户添加", component: User_add},
    				{path: '/user_modifu',      name:"客户修改", component: User_modifu},
    				{path: '/user_list_detail', name:"查看详情", component: User_list_detail},
    				{path: '/user_record',      name:"回访记录", component: User_record},
    				{path: '/user_trade',       name:"交易详情", component: User_trade},
    		]},
			{path: '/user_pending_list', name: '待处理项目列表', component: User_pending, children:[
	                {path: '/user_pending_modifu', name:"客户修改", component: User_modifu},
	                {path: '/user_pending_detail', name:"查看详情", component: User_list_detail},
	                {path: '/user_pending_record', name:"回访记录", component: User_pending_record},
	                {path: '/user_pending_trade', name:"交易详情", component: User_pending_trade},
	        ]},
    		{path: '/after_sales',   name:'售后列表', component: After_sales, children:[
    				{path: '/after_sales_add',    name:"添加",    component:After_sales_add},
    				{path: '/after_sales_modifu', name:"修改",    component:After_sales_modifu},
    				{path: '/after_sales_log',    name:"售后日志", component:After_sales_log}
    		]},
    		{path: '/salesman_list', name: '业务员列表', component: Salesman_list, children:[
    				{path: '/salesman_add', name:"添加", component:Salesman_add},
    				{path: '/salesman_modifu', name:"修改", component:Salesman_modifu},
    				{path: '/salesman_detail',name:'查看详情', component:Salesman_detail}

    		]},
    		{path: '/continue_fee', name:'待续费客户', component: Continue_fee, children: [
    				{path: '/continue_fee_modifu',name:"待续费修改",component: Continue_fee_modifu},
    				{path: '/continue_fee_record',name:"回访记录", component: Continue_fee_record},
    				{path: '/continue_fee_detail',name:"查看详情", component: Continue_fee_detail},
    		]},
    		{path: '/customer_change',name:"客户变更", component: Customer_change, children:[
    				{path: '/customer_change_modifu',name:"客户修改", component: Customer_change_modifu},
    				{path: '/customer_change_record',name:"回访记录", component: Customer_change_record},
    				{path: '/customer_change_detail',name:"查看详情", component: Customer_change_detail},
    				{path: '/hist_list',name:"变更记录", component: Hist_list},
    		]},
    ]},
    {path: '/trade_list', name: '财务管理', component: Index, children:[
    		{path: '/trade_list', name: '财务管理', component: Trade_list, children:[
						{path: 'add', name:"审核-详情", component: Trade_add}
				]},
				{path: '/trade_audit_list', name: '审核列表', component: Trade_audit_list, children:[
						{path: 'detail', name:"详情", component: Trade_detail}
				]},
		]},
    {path: '/employee_list', name: '员工管理', component: Index,children:[
    	{path: '/employee_list', name: '员工列表', component: Employee_list,children:[
    				{path: '/employee_list/add', name:"添加", component:Employee_add},
    				{path: '/employee_list/update', name:"修改", component:Employee_update},
    				{path: '/employee_list/detail', name:"查看详情", component:Employee_detail}
    		]},

  		{path: '/organize_add', name: '部门管理', component: Organize_add},
      {path: '/daily_list', name: '日志管理', component: Daily_list,children:[
        {path: '/daily_list/detail', name:"评论", component:Daily_detail},
      ]},
      {path: '/my_daily_list', name: '我的日志', component: My_Daily_list,children:[
        {path: '/my_daily_list/add', name:"添加", component:My_Daily_add},
        {path: '/my_daily_list/update', name:"修改", component:My_Daily_update},
      ]},
      {path:'/accident_list', name:'事故报告', component:Accident_list,children:[
      			{path: '/accident_list/add', name:"添加", component:Accident_report_add},
    				{path: '/accident_list/update', name:"修改", component:Accident_report_update},
    				{path: '/accident_list/detail', name:"查看详情", component:Accident_report_detail}
      ]},
      {path:'/item_develop_list', name:'项目进度', component:Item_develop_list,children:[
      			{path: '/item_develop_list/add', name:"添加", component:Item_develop_add},
    				{path: '/item_develop_list/update', name:"修改", component:Item_develop_update},
    				{path: '/item_develop_list/detail', name:"查看详情", component:Item_develop_detail}
      ]},

    ]},
    // {path: '/trade_list', name: '财务管理', component: Trade_list},

    {path: '/training_list',  name: '培训管理',  	component: Index, children:[
    		{path: '/invite_list',  name: '邀约人记录',  	component: Invite_list, children:[
		    		{path: '/invite_add',  	name:'添加',	component: Invite_add},
		    		{path: '/invite_update', name:'修改',	component: Invite_update},
		    		{path: '/invite_detail', name:'查看详情', 	component: Invite_detail},
		    ]},
    		{path: '/training_list',  name: '培训人列表',  	component: Training_list, children:[
		    		{path: '/training_list/add',  	name:'添加',	component: Training_add},
		    		{path: '/training_list/update', name:'修改',	component: Training_update},
		    		{path: '/training_list/detail', name:'查看详情', 	component: Training_detail},
		    		{path: '/training_list/item_add',  	name:'新增项目 ',	component: Training_item_add},
		    ]},
		    {path: '/trainingcourse_list',  name: '培训课程记录',  	component: Trainingcourse_list, children:[
		    		{path: '/trainingcourse_add',  	name:'添加',	component: Trainingcourse_add},
		    		{path: '/trainingcourse_update', name:'修改',	component: Trainingcourse_update},
		    ]},
		]},
		
    {path: '/big_customers',  name: '直销管理',  	component: Index, children:[
    		{path: '/big_customers',  name: '大客户列表',  	component: Big_customers, children:[
		    		{path: '/big_customers_add',  	name:'大客户添加',	component: Big_customers_add},
		    		{path: '/big_customers_modifu', name:'大客户修改',	component: Big_customers_modifu},
		    		{path: '/big_customers_record', name:'拜访记录', 	component: Big_customers_record},
		    		{path: '/big_customers_detail', name:'查看详情', 	component: Big_customers_detail},
		    ]},
		    {path: '/assigned_customer',  name: '已指派客户列表',  	component: Assigned_customer, children:[
		    		{path: '/assigned_customer_add',    name:'指派客户添加', 	component: Assigned_customer_add},
		    		{path: '/assigned_customer_modifu', name:'指派客户修改', 	component: Assigned_customer_modifu},
		    		{path: '/assigned_customer_record', name:'拜访记录',      component: Assigned_customer_record},
		    		{path: '/assigned_customer_detail', name:'查看详情',      component: Assigned_customer_detail},
		    ]},
		    {path: '/ordered',  name: '已成单客户列表',  	component: Ordered, children:[
		    		{path: '/ordered_add',  	name:'已成单客户添加',	component: Ordered_add},
		    		{path: '/ordered_modifu', name:'已成单客户修改',	component: Ordered_modifu},
		    		{path: '/ordered_record', name:'拜访记录', 		  component: Ordered_record},
		    		{path: '/ordered_detail', name:'查看详情', 	    component: Ordered_detail},
		    ]},
		]},
		{path: '/set_tabs', name:'设置', component: Index, children:[
			 	{path: '/set_tabs', name:'全局设置', component: Set_tabs},
				{path: '/set_sale_tabs', name:'业务设置', component: Set_sale_tabs},
		]},
    {path: '/menu', name: '权限管理', component: Index, children: [
	  		{path: '/menu_list', name: '菜单管理', component: Permission, children: [
	    			{path: '/menu_list/add', name: '菜单添加', component: Menu_add}
	  		]},
	      	{path: '/info_list',     name: '管理员列表', component: Info_list, children: [
	    			{path: '/info_list/add', name: '管理员添加', component: Info_add}
	  		]},
      	{path: '/permission_list', name: '权限列表',   component: Permission_list, children: [
    			{path: '/permission_list/add', name: '权限添加', component: Permission_add}
      	]},
      {path: '/sources_list', name: '资源列表', component: Sources_list, children: [
        {path: '/sources_list/add', name: '添加', component: Sources_add}]}
    ]},
		{ path: '/service_list',  name: '客服管理', component: Index, children:[
				{path: '/item_require_change', name:'项目需求变更', component: Item_require_change, children:[
					{path: '/user_item_detail', name:"查看项目", component: User_item_detail}
				]},
    		{path: '/service_list',     name: '项目列表', component: Service_list, children:[
    				{path: '/service_detail', name:"查看详情", component: Service_detail},
    				{path: '/user_record',      name:"回访记录", component: User_record},
    				{path: '/user_trade',       name:"交易详情", component: User_trade},
    		]},
    		{path: '/service_reply',   name:'客服售后列表', component: Service_reply, children:[
    				{path: '/service_reply_log',    name:"售后日志", component:Service_reply_log}
    		]}
    ]},
    
    {path: '/renew_trace', name:'续费管理', component: Index, children:[
			 	{path: '/renew_trace', name:'续费跟踪', component: Renew_trace,children :[
			 		 	{path: '/renew_add', name:'续费添加', component: Renew_add}
			 	]},
			 	{path: '/renew_trace_suc', name:'续费客户', component: Renew_trace_suc,children :[
			 		 	{path: '/renew_add_suc', name:'续费明细', component: Renew_add_suc}
			 	]}
		]},
		    {path: '/account', name:'帐号管理', component: Index, children:[
			 		 	{path: '/account_statistics', name:'帐号统计', component: Account_statistics},	
			 		 	{path: '/account_list', name:'帐号列表', component: Account_list,children:[
			 		 	     {path: '/itemAccountNumber_detail', name:'查看详情', component: ItemAccountNumber_detail},
			 		 	     {path: '/itemAccountNumber_modifu', name:'修改', component: ItemAccountNumber_modifu}
			 		 	]},
			 		 	{path: '/account_supervise', name:'客户列表', component: Account_supervise,children:[
			 		 	     {path: '/customer_user_add', name:'添加客户', component: Customer_user_add},
			 		 	     {path: '/customer_user_modifu', name:'客户信息修改', component: Customer_user_modifu},
			 		 	     {path: '/customer_item', name:'项目列表', component: Customer_item,children:[
			 		 	        {path: '/itemAccountNumber_add', name:'添加项目帐号密码', component: ItemAccountNumber_add},
			 		 	        {path: '/itemAccountNumber_detail', name:'查看详情', component: ItemAccountNumber_detail},
			 		 	        {path: '/itemAccountNumber_modifu', name:'修改', component: ItemAccountNumber_modifu}
			 		 	     ]}
			 		 	]}
		]},
   ]
})
