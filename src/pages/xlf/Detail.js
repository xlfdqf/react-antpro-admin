import React, { Component } from 'React';
import { connect } from 'dva';
import {Table, Row, Col, Button, Form, Input, Card, DatePicker, Modal, Popconfirm, Popover, Cascader,Divider } from 'antd';
import PageLoading from '@/components/PageLoading';
import moment from 'moment';

// @connect(({ Bike, loading }) => ({ Bike, loading: loading.models.Bike }))
@Form.create()
class Detail extends Component {
        state={
            isDetail:false,
            pagination:{
                currentPage:1,
                pageSize:10,
                showSizeChanger: true,
                showQuickJumper: true,
                    },  
							
         };

    
  render() {
  	const {columns, data, pagination, visible,visibleDelAll, ids, num,isDetail} = this.state;
  	// console.log(this.state);
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
    const list=[{
        header:'基本信息',
        dataList:[{
          columns:[{
              title:'变量名称',
              dataIndex:'name'
            },
            {
              title:'变量参数',
              dataIndex:'param',

            },
            {
              title:'变量类型',
              dataIndex:'type',
            },
            {
              title:'变量属性',
              dataIndex:'attr',
            },
            {
              title:'变量朝向',
              dataIndex:'flag',
            }
          ],
          data:[{
              name:'姓名',
              param:'张三',
              type:'名义',
              attr:'定性',
              flag:'中性'
            }, {
              name:'出生年代',
              param:'',
              type:'',
              attr:'',
              flag:''
            }, {
              name:'性别',
              param:'',
              type:'',
              attr:'',
              flag:''
            }, {
              name:'',
              param:'',
              type:'',
              attr:'',
              flag:''
            }, {
              name:'',
              param:'',
              type:'',
              attr:'',
              flag:''
            }, {
              name:'',
              param:'',
              type:'',
              attr:'',
              flag:''
            }
          ]
        }, {
          columns:[{
              title:'累积好人概率',
              dataIndex:'name1',
            },
            {
              title:'累积逾期概率',
              dataIndex:'param',
            },
            {
              title:'累积可疑概率',
              dataIndex:'type',
            },
            {
              title:'累积坏人分布',
              dataIndex:'attr',
            },
            {
              title:'决策参考值',
              dataIndex:'a',
            },
            {
              title:'当前模型评分',
              dataIndex:'b',
            }
          ],
          data:[{
              name1:'姓名',
              param:'张三',
              type:'名义',
              attr:'定性',
              flag:'中性'
            }, {
              name:'出生年代',
              param:'',
              type:'',
              attr:'',
              flag:''
            }, {
              name:'性别',
              param:'',
              type:'',
              attr:'',
              flag:''
            }, {
              name:'',
              param:'',
              type:'',
              attr:'',
              flag:''
            }, {
              name:'',
              param:'',
              type:'',
              attr:'',
              flag:''
            } ,{
              name:'',
              param:'',
              type:'',
              attr:'',
              flag:''
            }
          ]
        }]
      },{
          header:'欺诈信息',
          dataList:[{
              columns:[{
                  title:'变量名称',
                  dataIndex:'name',
                },
                {
                  title:'变量参数',
                  dataIndex:'param',

                },
                {
                  title:'变量类型',
                  dataIndex:'type',
                },
                {
                  title:'变量属性',
                  dataIndex:'attr',
                },
                {
                  title:'变量朝向',
                  dataIndex:'flag',
                }
              ],
              data: [{
                  name:'紧急联系人击中反黑名单数量',
                  param:'',
                  type:'',
                  attr:'',
                  flag:''
                } ,{
                  name:'紧急联系人命中黑名单数量',
                  param:'',
                  type:'',
                  attr:'',
                  flag:''
                }, {
                  name:'实名验证不通过次数',
                  param:'',
                  type:'',
                  attr:'',
                  flag:''
                }, {
                  name:'手机号三要素验证不通过次数',
                  param:'',
                  type:'',
                  attr:'',
                  flag:''
                }, {
                  name:'银行卡验证不通过次数',
                  param:'',
                  type:'',
                  attr:'',
                  flag:''
                }

              ]
            },
            {
              columns:[{
                  title:'累积好人概率',
                  dataIndex:'name1',
                },
                {
                  title:'累积逾期概率',
                  dataIndex:'param',
                },
                {
                  title:'累积可疑概率',
                  dataIndex:'type',
                },
                {
                  title:'累积坏人分布',
                  dataIndex:'attr',
                },
                {
                  title:'决策参考值',
                  dataIndex:'a',
                },
                {
                  title:'当前模型评分',
                  dataIndex:'b',
                }
              ],
              data: [

              ]
            }]
      }];

  	return (
             <Card>
              <Button onClick={()=>{this.props.goBack(false)}}>返回</Button>
                 {
                   list.map(({header,dataList}) =>{
                     return (
                       <Row gutter={24}>
                       {
                         dataList.map(({columns,data}) =>{
                            return(
                              <Col span={12}>
                              <Table columns={columns} dataSource={data} pagination={false}/>
                              </Col>
                            )
                         })
                        }
                       </Row>
                      )
                  }) 
                 }
             </Card>
         )
  }
}

export default Detail; 
