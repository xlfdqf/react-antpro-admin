import React, { Component } from 'React';
import { connect } from 'dva';
import {Table,Row,Col,Button,Form,Input,Card,DatePicker,Modal,Popconfirm,Popover,Cascader,Divider,Upload,Alert,BackTop  } from 'antd';
import PageLoading from '@/components/PageLoading';
import moment from 'moment';
import Detail from './Detail'
import  city  from '@/utils/city';
import styles from './Bike.less';
import PageHeaderLayout from '@/components/PageHeaderWrapper';
import ExportJsonExcel from 'js-export-excel'; // 安装导出插件：npm install js-export-excel

@Form.create()
class BikeTable extends Component {
        state={
			 pagination:{
	            currentPage:1,
	            pageSize:10,
	            showSizeChanger: true,
                showQuickJumper: true,
				},
			 data: [{
			     name: '胡彦斌',
			     sex: '男',
			     age:22,
			     tel: '13878490329',
			     birthday:'1986-10-11',
			     idCard:'340978199578431265',
			     company:'融都科技有限公司',
			     address:'浙江省杭州市西湖区西斗门路',
			     idCard2:'340978199578431265',
			     idCard3:'340978199578431265',
			     idCard4:'340978199578431265',
			     idCard5:'340978199578431265',
			     idCard6:'340978199578431265',
			   },{
			     name: '古力娜扎',
			     sex: '女',
			      age:18,
			     tel: '13878490329',
			     birthday:'1995-10-26',
			    idCard:'340978199578431265',
			     company:'融都科技有限公司',
			     address:'浙江省杭州市西湖区西斗门路',
			      idCard2:'340978199578431265',
			     idCard3:'340978199578431265',
			     idCard4:'340978199578431265',
			     idCard5:'340978199578431265',
			     idCard6:'340978199578431265',
			   }, {
			     name: '胡歌',
			     sex: '男',
			      age:30,
			     tel: '13878490329',
			     birthday:'1986-10-24',
			     idCard:'340978199578431265',
			     company:'融都科技有限公司',
			     address:'浙江省杭州市西湖区西斗门路',
			      idCard2:'340978199578431265',
			     idCard3:'340978199578431265',
			     idCard4:'340978199578431265',
			     idCard5:'340978199578431265',
			     idCard6:'340978199578431265',
			   }, {
			     name: '江疏影',
			     sex: '女',
			      age:25,
			     tel: '13878490329',
			     birthday:'1986-10-21',
			     idCard:'340978199578431265',
			     company:'融都科技有限公司',
			      address:'浙江省杭州市西湖区西斗门路',
			       idCard2:'340978199578431265',
			     idCard3:'340978199578431265',
			     idCard4:'340978199578431265',
			     idCard5:'340978199578431265',
			     idCard6:'340978199578431265',
			   }, {
			     name: '张若昀',
			     sex: '男',
			      age:28,
			     tel: '13878490329',
			      birthday:'1986-10-21',
			      idCard:'340978199578431265',
			     company:'融都科技有限公司',
			       address:'浙江省杭州市西湖区西斗门路',
			        idCard2:'340978199578431265',
			     idCard3:'340978199578431265',
			     idCard4:'340978199578431265',
			     idCard5:'340978199578431265',
			     idCard6:'340978199578431265',
			   }],

			  columns: [
				   {
				       title:'姓名',
				       dataIndex:'name',
				        key:"name",
				        width:100,
				        fixed:'left'
				   },
				   {
				       title:'性别',
				       dataIndex:'sex',
				        key:"sex",
				         width:100,
				         fixed:'left'
				   },
				   {
				       title:'年龄',
				       dataIndex:'age',
				        key:"age",
				         width:100,
				        sorter: (a, b) => a.age - b.age,
				   },
				   {
				       title:'手机号码',
				       dataIndex:'tel',
				        key:"tel",
				         width:150,
				   },
				    {
				       title:'出生年月',
				       dataIndex:'birthday',
				       key:'birthday',
				        width:150,
				       sorter: (a, b) => a.age - b.age,
				   },{
				       title:'身份证号码',
				       dataIndex:'idCard',
				        key:"idCard",
				         width:150,
				   },
				   {
				       title:'工作单位',
				       dataIndex:'company',
				        key:"company",
				        width:150,
				   },
				    {
				       title:'家庭住址',
				       dataIndex:'address',
				        key:"address",
				        width:150,
				          render: (text,record) => {
				          	return  (
					          	   <Popover content={text}>
					          	       <div className={styles.a} style={{width:'120px'}}>{text}</div>
					          	   </Popover>
				          	      )
				          }
				   },
				   {
				       title:'身份证号码',
				       dataIndex:'idCard2',
				        key:"idCard2",
				        width:150,
				   },
				   {
				       title:'身份证号码',
				       dataIndex:'idCard3',
				        key:"idCard3",
				        width:150,
				   },
				   {
				       title:'身份证号码',
				       dataIndex:'idCard4',
				        key:"idCard4",
				        width:150,
				   },
				   {
				       title:'身份证号码',
				       dataIndex:'idCard5',
				        key:"idCard5",
				        width:150,
				   },
				    {
				       title:'身份证号码',
				       dataIndex:'idCard5',
				        key:"idCard6",
				        width:150,
				   },
				   {
				       title:'操作',
				       dataIndex:'operate',
				       fixed:'right',
				       render: (text,record) => {
				         return (
				         	<div>
				         	    <a type='default' style = {{'marginRight':'10px'}} onClick={this.detail}>详情</a>
				            </div>
				         	)
				       }
					 }]
         };

 detail=()=>{
   this.props.history.push('/xlf/bike');
 }
// 导出excel
downloadExcel = () =>{
  const data = this.state.data ? this.state.data : '';//表格数据
  var option={};
  let dataTable = [];
  if (data) {
    for (let i in data) {
      if(data){
        let obj = {
          'ID': data[i].id,
          '姓名': data[i].name,
          '性别': data[i].sex,
          '手机号': data[i].tel,
          '家庭住址': data[i].address,
        }
        dataTable.push(obj);
      }
    }
  }
  option.fileName = '用户信息'
  option.datas=[
    {
      sheetData:dataTable,
      sheetName:'sheet',
      sheetFilter:['ID','姓名','性别','手机号','家庭住址'],
      sheetHeader:['ID','姓名','性别','手机号','家庭住址'],
    }
  ];

  var toExcel = new ExportJsonExcel(option); 
  toExcel.saveExcel();  
}
// 打印
print = () =>{
    window.document.body.innerHTML = window.document.getElementById('billDetails').innerHTML;  
    window.print(); 
    window.location.reload();
}

  render() {
  	const {columns, data, pagination, visible,visibleDelAll, ids, num,isDetail} = this.state;
  	const { getFieldDecorator } = this.props.form;

  	const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };

  	return (
  	 <PageHeaderLayout title="高级表格">
  		<div>
  		
  		  <Form { ...formItemLayout } >
	  		  <Card style={{'marginBottom':'20px'}}>
		  		   <Row gutter={10}>
		               <Col md={6}>
		                    <Button type='default' style={{'marginRight':'10px'}} onClick={this.downloadExcel}>导出</Button>
		                     <Button type='default' style={{'marginRight':'10px'}} onClick={this.print}>打印</Button>
		                </Col>
		  		   </Row>
	  		   </Card>
  		  </Form>
  		   <Alert message="温馨提示！" type="info" showIcon closable style={{marginBottom:'5px'}}/>
  		  <Card id={'billDetails'}>
	      <Table columns={columns}
	      scroll={{ x: 1980,y:300 }}
	       rowKey="id"
	       dataSource={data}
	       pagination={pagination}
	        />

		 </Card>
		 <Card id={'billDetails'}>
	      <Table columns={columns}
	      scroll={{ x: 1980,y:300 }}
	       rowKey="id"
	       dataSource={data}
	       pagination={pagination}
	        />

		 </Card>
		  <BackTop>
	      <div className={styles.xlf}>顶部</div>
	    </BackTop>
      </div>

      </PageHeaderLayout>
    )
  }
}

export default BikeTable; 
