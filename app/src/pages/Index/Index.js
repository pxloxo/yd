import React, { Component } from 'react'
import { Switch, Redirect, NavLink } from "react-router-dom"
import lazyLoad from "../../util/lazyLoad"
import "./Index.css"
import MyRoute from "../MyRoute/MyRoute"
const Home = lazyLoad(() => import("../Home/Home"))
const FlList = lazyLoad(() => import("../FlList/FlList"))
const FlxInfo = lazyLoad(() => import("../FlxInfo/FlxInfo"))
const Cart = lazyLoad(() => import("../Cart/Cart"))
const Im = lazyLoad(() => import("../Im/Im"))
export default class Index extends Component {
    render() {
        return (
            <div className="index">
                <Switch>
                    <MyRoute path="/index/home" component={Home}></MyRoute>
                    <MyRoute path="/index/flList" component={FlList}></MyRoute>
                    <MyRoute path="/index/flxInfo" component={FlxInfo}></MyRoute>
                    <MyRoute path="/index/cart" component={Cart}></MyRoute>
                    <MyRoute path="/index/im" component={Im}></MyRoute>
                    <Redirect to="/index/home"></Redirect>
                </Switch>
                <footer>
                    <div>
                        <NavLink to="/index/home" activeClassName="active">
                            <i className="home"></i>
                            <p>首页</p>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/index/flList" activeClassName="active">
                            <i className="list"></i>
                            <p>分类</p>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/index/cart" activeClassName="active">
                            <i className="index-cart"></i>
                            <p>购物车</p>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/index/im" activeClassName="active">
                            <i className="im"></i>
                            <p>我的</p>
                        </NavLink>
                    </div>
                </footer>
            </div>
        )
    }
}
