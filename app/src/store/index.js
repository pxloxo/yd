//创建仓库
import { createStore, applyMiddleware } from "redux"
//使得action可以异步操作
import thunk from "redux-thunk"
//数据请求
import { requestIndexGoods, requestBanner, requestFlList,  } from "../util/request"
import { Component } from "react"

//初始状态
const initState = {
    banner: [],
    flxInfo: [],
    flList: [],
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
        default:
            return state;
    }
}

//导出首页商品信息
export const flxInfo = (state) => state.flxInfo
//导出轮播图
export const banner = (state) => state.banner
//导出商品列表
export const flList = (state) => state.flList


const store = createStore(reducer, applyMiddleware(thunk));

export default store




