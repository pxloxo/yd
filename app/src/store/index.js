//创建仓库
import { createStore, applyMiddleware } from "redux"
//使得action可以异步操作
import thunk from "redux-thunk"
//数据请求
import { requestIndexGoods, requestBanner, requestFlList, requestCartList, requestDetail } from "../util/request"
import { Component } from "react"

//初始状态
const initState = {
    banner: [],
    flxInfo: [],
    flList: [],
    cartList: [],
    flDetail: {}
}


//轮播图
const changeBannerAction = (arr) => {
    return { type: "changeBanner", list: arr }
}
export const requestBannerAction = () => {
    return (dispatch, getState) => {
        const { banner } = getState()
        if (banner.length > 0) {
            return;
        }
        requestBanner().then(res => {
            dispatch(changeBannerAction(res.data.list))
        })
    }
}
//首页商品信息
const changeFlxInfoAction = (arr) => {
    return { type: "changeFlxInfo", list: arr }
}
export const requestFlxInfoAction = () => {
    return (dispatch, getState) => {
        const { flxInfo } = getState()
        if (flxInfo.length > 0) {
            return;
        }
        requestIndexGoods().then(res => {
            dispatch(changeFlxInfoAction(res.data.list[0].content))
        })
    }
}
//商品详情
const getFlDetailAction = (info) => {
    return { type: "getFlDetail", detail: info }
}
export const requestFlDetailAction = (id) => {
    return (dispatch, getState) => {
        if (id === getState(id).flDetail.id) {
            return
        }
        requestDetail({ id:id }).then(res => {
            let list = res.data.list[0]
            list.img = Component.prototype.$img + list.img
            list.specsattr = JSON.parse(list.specsattr)
            dispatch(getFlDetailAction(list))
        })
    }
}
//商品列表
const changeFlListAction = (arr) => {
    return { type: "changeFlList", list: arr }
}
export const requestFlListAction = () => {
    return (dispatch, getState) => {
        requestFlList().then(res => {
            const { flList } = getState()
            if (flList.length > 0) {
                return;
            }
            dispatch(changeFlListAction(res.data.list))
        })
    }
}
//购物车列表
const getCartListAction = (arr) => {
    return { type: "getCartList", list: arr }
}
//全选
export const changeCheckedAction = (bool) => {
    return { type: "changeChecked", bool }
}
//单选
export const changeOneCheckedAction = (index) => {
    return { type: "changeOneChecked", index }
}
export const requestCartListAction = (uid) => {
    return (dispatch, getState) => {
        requestCartList({ uid: uid }).then(res => {
            let list = res.data.list
            if (!list) {
                return
            }
            list.forEach(item => {
                item.img = Component.prototype.$img + item.img
                item.checked = false
            })
            dispatch(getCartListAction(list))
        })
    }
}
//reducer 修改state
const reducer = (state = initState, action) => {

    switch (action.type) {
        case "changeFlxInfo":
            return {
                ...state,
                flxInfo: action.list
            }
        case "changeBanner":
            return {
                ...state,
                banner: action.list
            }
        case "changeFlList":
            return {
                ...state,
                flList: action.list
            }
        case "getFlDetail":
            return {
                ...state,
                flDetail: action.detail
            }
        case "getCartList":
            return {
                ...state,
                cartList: action.list
            }
        case "changeChecked":
            let cartList1 = [...state.cartList]
            cartList1.forEach(item => {
                item.checked = action.bool
            })
            return {
                ...state,
                cartList: cartList1
            }
        case "changeOneChecked":
            let cartList2 = [...state.cartList]
            cartList2[action.index].checked = !cartList2[action.index].checked
            return {
                ...state,
                cartList: cartList2
            }
        default:
            return state;
    }
}

//导出首页商品信息
export const flxInfo = (state) => state.flxInfo
//导出轮播图
export const banner = (state) => state.banner
//导出商品详情
export const flDetail = (state) => state.flDetail
//导出商品列表
export const flList = (state) => state.flList
//导出购物车列表
export const cartList = (state) => state.cartList

const store = createStore(reducer, applyMiddleware(thunk));

export default store




