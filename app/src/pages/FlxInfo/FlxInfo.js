import React, { Component } from 'react'
import { requestFlxInfo } from '../../util/request'
import querystring from "querystring"
import "./FlxInfo.css"
import { Link } from "react-router-dom"
import { filterPrice } from "../../filter"
export default class FlxInfo extends Component {
    constructor() {
        super()
        this.state = {
            flxInfo: [],
            name: ""
        }
    }
    componentDidMount() {
        let pid = querystring.parse(this.props.location.search.slice(1)).pid
        let name = querystring.parse(this.props.location.search.slice(1)).name
        requestFlxInfo({ fid: pid }).then(res => {
            let list = res.data.list
            if (!list) {
                this.setState({
                    flxInfo: list,
                    name: name
                })
            } else {
                list.forEach(item => {
                    item.img = this.$img + item.img
                })
                // console.log(list);
                this.setState({
                    flxInfo: list,
                    name: name
                })
            }

        })
    }
    render() {
        let { flxInfo, name } = this.state
        console.log(flxInfo);
        return (
            <div className="flxInfo">
                <header>
                    <Link to="/index/flList">返回</Link>
                    <h3>{name}</h3>
                </header>
                {
                    flxInfo ?
                        <main>
                            <ul>
                                {
                                    flxInfo.length > 0 ?
                                    flxInfo.map(item => {
                                            return (
                                                <Link to={"/FlDetail/?id=" + item.id} key={item.id}>
                                                    <li >
                                                        <div>
                                                            <img src={item.img} alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="name">{item.goodsname}</p>
                                                            <p className="price">￥{filterPrice(item.price)}</p>
                                                            <span>立刻抢购</span>
                                                        </div>
                                                    </li></Link>
                                            )
                                        })
                                        : null
                                }
                            </ul>
                        </main>
                        : <p>暂无数据</p>
                }
            </div>
        )
    }
}
