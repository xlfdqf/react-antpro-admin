import React, { Component } from 'React';
import { connect } from 'dva';
import { Table, Row, Col, Button, Form, Input, Card, DatePicker, Modal, Popconfirm, Popover, Cascader } from 'antd';
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from "bizcharts";
import styles from './BikeList.less'
import DataSet from "@antv/data-set";

// @connect(({ BikeListBikeList, loading }) => ({ BikeList, loading: loading.models.Bike }))
@Form.create()
class BikeList extends Component {

	render() {
		// 柱状图
		const data1 = [
			{
				year: '2015年',
				sales: 38
			}, {
				year: '2016年',
				sales: 100
			}, {
				year: '2017年',
				sales: 52
			}, {
				year: '2018年',
				sales: 69
			}, {
				year: '2019年',
				sales: 12
			},
		];
		const scale = {
			sales: {
				tickInterval: 20,
			}
		};
		// 折线图
		const data2 = [{
			month: "一月",
			Tokyo: 7.0,
			London: 3.9
		},
		{
			month: "二月",
			Tokyo: 6.9,
			London: 4.2
		},
		{
			month: "三月",
			Tokyo: 9.5,
			London: 5.7
		},
		{
			month: "四月",
			Tokyo: 14.5,
			London: 8.5
		},
		{
			month: "五月",
			Tokyo: 18.4,
			London: 11.9
		},
		{
			month: "六月",
			Tokyo: 21.5,
			London: 15.2
		},
		{
			month: "七月",
			Tokyo: 25.2,
			London: 17.0
		},
		{
			month: "八月",
			Tokyo: 26.5,
			London: 16.6
		},
		{
			month: "九月",
			Tokyo: 23.3,
			London: 14.2
		},
		{
			month: "十月",
			Tokyo: 18.3,
			London: 10.3
		},
		{
			month: "十一月",
			Tokyo: 13.9,
			London: 6.6
		},
		{
			month: "十二月",
			Tokyo: 9.6,
			London: 4.8
		}
		];
		const ds = new DataSet();
		const dv = ds.createView().source(data2);
		dv.transform({
			type: "fold",
			fields: ["Tokyo", "London"],
			key: "city",
			value: "temperature" // value字段
		});
		console.log(dv);
		const cols = {
			month: {
				range: [0, 1]
			}
		};
		// 饼形图
		const { DataView } = DataSet;
		const { Html } = Guide;
		const data3 = [
			{
				item: "事例一",
				count: 40
			},
			{
				item: "事例二",
				count: 21
			},
			{
				item: "事例三",
				count: 17
			},
			{
				item: "事例四",
				count: 13
			},
			{
				item: "事例五",
				count: 9
			}
		];
		const dv2 = new DataView();
		dv2.source(data3).transform({
			type: "percent",
			field: "count",
			dimension: "item",
			as: "percent"
		});
		const cols2 = {
			percent: {
				formatter: val => {
					val = val * 100 + "%";
					return val;
				}
			}
		};
		//  漏斗图
		const { Text } = Guide;
		// const { DataView } = DataSet;
		let data4 = [
			{
				action: "浏览网站",
				pv: 50000
			},
			{
				action: "放入购物车",
				pv: 35000
			},
			{
				action: "生成订单",
				pv: 25000
			},
			{
				action: "支付订单",
				pv: 15000
			},
			{
				action: "完成交易",
				pv: 8000
			}
		];
		const dv3 = new DataView().source(data4);
		dv3.transform({
			type: "percent",
			field: "pv",
			dimension: "action",
			as: "percent"
		});
		data4 = dv3.rows;
		const cols3 = {
			percent: {
				nice: false
			}
		};

		return (
			<Card>
				<Row>
					<Col span={12}>
						<Chart height={400} data={data1} scale={scale} className="chart1" forceFit>
							<span className={styles.mainTitle}>
								柱状统计图
					  </span>
							<Axis name="year" title={true} />
							<Axis name="sales" title={true} />
							<Tooltip
								crosshairs={{
									type: "y"
								}}
							/>
							<Geom type="interval" position="year*sales" color={'year'} />
						</Chart>
					</Col>
					<Col span={12}>
						<Chart height={400} data={dv} scale={cols} forceFit>
							<span className={styles.mainTitle}>
								多条折线统计图
					  </span>
							<Legend />
							<Axis name="month" />
							<Axis name="temperature"
								label={{
									formatter: val => `${val}°C`
								}}
							/>
							<Tooltip crosshairs={{ type: "y" }} />
							<Geom type="line" position="month*temperature" size={2} color={"city"} />
							<Geom
								type="point"
								position="month*temperature"
								size={4}
								shape={"circle"}
								color={"city"}
								style={{
									stroke: "#fff",
									lineWidth: 1
								}}
							/>
						</Chart>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Chart height={400} data={dv2} scale={cols2} forceFit >
							<span className={styles.mainTitle}>
								饼形统计图
					  </span>
							<Coord type={"theta"} radius={0.75} innerRadius={0.6} />
							<Axis name="percent" />
							<Legend
								position="right"
								offsetY={-window.innerHeight / 2 + 120}
								offsetX={-100}
							/>
							<Tooltip
								showTitle={false}
								itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
							/>
							<Guide>
								<Html
									position={["50%", "50%"]}
									html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
									alignX="middle"
									alignY="middle"
								/>
							</Guide>
							<Geom
								type="intervalStack"
								position="percent"
								color="item"
								tooltip={[
									"item*percent",
									(item, percent) => {
										percent = percent * 100 + "%";
										return {
											name: item,
											value: percent
										};
									}
								]}
								style={{
									lineWidth: 1,
									stroke: "#fff"
								}}
							>
								<Label content="percent"
									formatter={(val, item) => {
										return item.point.item + ": " + val;
									}}
								/>
							</Geom>
						</Chart>
					</Col>
					<Col span={12}>
						<Chart height={400} data={data4} scale={cols} forceFit>
							<span className={styles.mainTitle}>
								漏斗统计图
					  </span>
							<Tooltip showTitle={false}
								itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>浏览人数：{pv}</span><br/><span style=&quot;padding-left: 16px&quot;>占比：{percent}</span><br/></li>"
							/>
							<Coord type="rect" transpose scale={[1, -1]} />
							<Legend />
							<Guide>
								{data4.map(obj => {
									return (
										<Text
											top={true}
											position={{
												action: obj.action,
												percent: "median"
											}}
											content={parseInt(obj.percent * 100) + "%"}
											style={{
												fill: "#fff",
												fontSize: "12",
												textAlign: "center",
												shadowBlur: 2,
												shadowColor: "rgba(0, 0, 0, .45)"
											}}
										/>
									);
								})}
							</Guide>
							<Geom
								type="intervalSymmetric"
								position="action*percent"
								shape="funnel"
								color={[
									"action",
									["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]
								]}
								tooltip={[
									"action*pv*percent",
									(action, pv, percent) => {
										return {
											name: action,
											percent: parseInt(percent * 100) + "%",
											pv: pv
										};
									}
								]}
							>
								<Label
									content={[
										"action*pv",
										(action, pv) => {
											return action + " " + pv;
										}
									]}
									offset={35}
									labeLine={{
										lineWidth: 1,
										stroke: "rgba(0, 0, 0, 0.15)"
									}}
								/>
							</Geom>
						</Chart>
					</Col>
				</Row>
			</Card>
		)
	}
}

export default BikeList; 
