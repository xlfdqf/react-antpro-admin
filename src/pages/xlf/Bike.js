import React, { Component } from 'React';
import { connect } from 'dva';
import { Table, Row, Col, Button, Form, Input, Card, DatePicker, Modal, Popconfirm, Popover, Cascader, Divider, Upload, Carousel, Icon } from 'antd';
import PageLoading from '@/components/PageLoading';
import moment from 'moment';
import Detail from './Detail'
import styles from './Bike.less';
import city from '@/utils/city';
import UploadCom from '@/components/Upload/Upload';
import PageHeaderLayout from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
const confirm = Modal.confirm;

@connect(({ bike, loading }) => ({ bike, loading: loading.models.bike }))
@Form.create()
class Bike extends Component {
	state = {
		ids: [], //多选id
		visible: false, //添加弹窗
		visibleDelAll: false, //批量删除弹窗
		// visibleUpdate:false, //修改弹窗
		// visibleDelete:false, //删除弹窗
		num: 0, //0 新增 1修改
		isDetail: false, //详情页面
		pagination: {
			currentPage: 1,
			pageSize: 10,
			showSizeChanger: true,
			showQuickJumper: true,
		},
		columns: [{
			title: 'ID',
			dataIndex: 'id',
			key: "id",
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: "name",
			render: (text) => {
				return (
					<Link to="/xlf/bike-table">{text}</Link>
				)
			}
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: "sex"
		},
		{
			title: '手机号码',
			dataIndex: 'tel',
			key: "tel",
			render: (text, record) => {
				return text
			}
		},
		{
			title: '出生年月',
			dataIndex: 'birthday',
			key: 'birthday',
			render: (text, record) => {
				return (
					text.map((item, i) => {
						return <div style={{ width: '100px' }} key={i}>{item}</div>
					})
				)
			}
		},
		{
			title: '家庭住址',
			dataIndex: 'address',
			key: "address",
			render: (text, record) => {
				return (
					<Popover content={text}>
						<div className={styles.a} style={{ width: '120px' }}>{text}</div>
					</Popover>
				)
			}
		},
		{
			title: '身份证照片',
			dataIndex: 'idImg',
			key: "idImg",
			render: (text, record) => (<img src={text} style={{ width: '100px', height: '60px' }} />)
		},
		{
			title: '操作',
			dataIndex: 'operate',
			render: (text, record) => {
				return (
					<div>
						<a type='default' style={{ 'marginRight': '10px' }} onClick={this.showDetail}>详情</a>
						<Divider type="vertical" />
						<a type='primary' style={{ 'marginRight': '10px' }} onClick={this.showModal.bind(this, true, 1)}>编辑</a>
						<Divider type="vertical" />
						<Popconfirm title="你确定要删除该条数据吗?" onConfirm={() => this.onDelete(record)}>
							<a type='danger'>删除</a>
						</Popconfirm>
					</div>
				)
			}
		}]
	};


	// 改变日期
	onChange = (date, dateString) => {
		// console.log(dateString);
	};

	//省市区三级联动值
	cityOnChange = (value) => {
		console.log(value)
	}

	// 重置
	chongzhi = () => {
		console.log('重置')
		this.props.form.resetFields();
	};

	//条件查询
	search = () => {
		console.log('查询')
	}

	//删除
	onDelete = (record) => {
		console.log(record)
	}

	//是否显示添加 修改弹窗
	showModal = (flag, num) => {
		this.setState({ visible: flag });
		if (num === 0) { // 添加
			this.setState({
				num: 0
			});
		} else {  //修改
			this.setState({
				num: 1
			});
		}
	}

	showDetail = () => {
		this.setState({
			isDetail: true
		})
	}

	// 确定添加/修改
	handleAddOk = (flag, num) => {
		const { form, dispatch } = this.props;
		console.log(this)
		form.validateFields(['name', 'tel', 'birthday'], (errors, fieldsValue) => {
			if (errors) {
				return false;
			} else {
				const { birthday, ...attr } = fieldsValue;
				const date = moment(birthday).format('YYYY-MM-DD');
				const param = { date, ...attr };
				if (num === 0) {
					dispatch({
						type: 'bike/add',
						// pyload:param
					});
				} else {
					dispatch({
						type: '/',
						pyload: param
					});
				}
				this.setState({ visible: flag }); // 隐藏弹窗
				this.props.form.resetFields(); //清空数据
			}
		});
	}

	//取消添加/修改
	handleAddCancel = (flag) => {
		this.setState({ visible: flag });
		this.props.form.resetFields();
	}
	//批量删除
	showDeleteConfirms = () => {
		let that = this;
		confirm({
			title: '你确定删除所选数据?',
			// content: 'Some descriptions',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(that.state.ids);
			},
			onCancel() {
				// console.log('Cancel');
			},
		});
	}

	goBack(mode) {
		this.setState({
			isDetail: mode
		})
	}

	back = () => {
		this.props.history.go(-1);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'bike/initLoad',
		});
	}

	render() {
		const { columns, data, pagination, visible, visibleDelAll, ids, num, isDetail } = this.state;
		// console.log(this.state);
		const { getFieldDecorator } = this.props.form;
		const { list } = this.props.bike;
		// console.log(this.props)

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
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				// console.log(`选中的rowKeys: ${selectedRowKeys}`, '选中的记录: ', selectedRows);
				this.setState({
					ids: selectedRowKeys
				})
			}
		};

		return (
			<PageHeaderLayout title={!isDetail ? '基础表格' : '表格详情页'}>
				{!isDetail ?
					(<div>
						<Form {...formItemLayout}>
							<Card style={{ 'marginBottom': '20px' }}>
								<Row gutter={10}>
									<Col md={4}>
										<Form.Item label='姓名'>
											{getFieldDecorator('name', { initialValue: '' })(<Input placeholder='请输入姓名' />)}
										</Form.Item>
									</Col>
									<Col md={4}>
										<Form.Item label='手机号码'>
											{getFieldDecorator('tel')(<Input placeholder='请输入手机号码' />)}
										</Form.Item>
									</Col>
									<Col md={4}>
										<Form.Item label='出生年月'>
											{getFieldDecorator('birthday')(<DatePicker onChange={this.onChange} />)}
										</Form.Item>
									</Col>
									<Col md={5}>
										<Form.Item label='家庭地址'>
											{getFieldDecorator('address')(<Cascader options={city} placeholder="家庭地址" onChange={this.cityOnChange} />)}
										</Form.Item>
									</Col>
									<Col md={10}>
										<Button type='primary' style={{ 'marginRight': '10px' }} onClick={this.search}>查询</Button>
										<Button type='dafault' onClick={this.chongzhi.bind(this)} style={{ 'marginRight': '10px' }}>重置</Button>
										<Button type='primary' style={{ 'marginRight': '10px' }} onClick={this.showModal.bind(this, true, 0)}>新增</Button>
										<Button type='danger' onClick={this.showDeleteConfirms} style={{ 'marginRight': '10px' }}>批量删除</Button>
										<Button type='dafault' onClick={this.back}>返回上一页</Button>
									</Col>
								</Row>
							</Card>
						</Form>
						<Card>
							<Table columns={columns} rowKey="id" dataSource={list} pagination={pagination} rowSelection={rowSelection} />
							<Modal
								title={num === 0 ? '新增' : '修改'}
								visible={this.state.visible}
								onOk={this.handleAddOk.bind(this, false, num)}
								onCancel={this.handleAddCancel.bind(this, false)}
							>
								<Form {...formItemLayout}>
									<Row>
										<Col md={20}>
											<Form.Item label='姓名'>
												{getFieldDecorator('name', {
													initialValue: '初始值',
													rules: [
														{
															required: true,
															message: '姓名不能为空！'
														}
													]
												})(<Input placeholder='请输入姓名' />)}
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col md={20}>
											<Form.Item label='手机号码'>
												{getFieldDecorator('tel', {
													rules: [
														{
															required: true,
															message: '手机号码不能为空！'
														}
													]
												})(<Input placeholder='请输入手机号码' />)}
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col md={20}>
											<Form.Item label='出生年月'>
												{getFieldDecorator('birthday', {
													rules: [
														{
															required: true,
															message: '出生年月不能为空！'
														}
													]
												})(<DatePicker onChange={this.onChange} />)}
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col md={20}>
											<Form.Item label='身份证照片'>
												{getFieldDecorator('idImg', {
													rules: [
														{
															required: true,
															message: '身份证照片不能为空！'
														}
													]
												})(<UploadCom />)}
											</Form.Item>
										</Col>
									</Row>
								</Form>
							</Modal>
						</Card>
					</div>) : <Detail style={{ display: isDetail ? 'block' : `none` }} goBack={param => this.goBack(param)} />
				}
			</PageHeaderLayout>
		)
	}
}

export default Bike; 
