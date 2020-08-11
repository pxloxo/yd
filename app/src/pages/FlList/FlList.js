import React, { Component } from 'react'
import "./FlList.css"
import { connect } from 'react-redux'
import { requestFlListAction, flList } from '../../store'
import { Link } from 'react-router-dom'

class FlList extends Component {
    constructor() {
        super()
        this.state = {
            n: 0
        }
    }
    componentDidMount() {
        this.props.requestFlList()
    }
    changeN(index) {
        this.setState({
            n: index
        })
    }
    render() {
        let { n } = this.state
        let { flList } = this.props
        return (
            <div className="flList">
                <header>
                    <p>分类</p>
                </header>
                <main>
                    <div className="flList-left">
                        <ul>
                            {
                                flList.map((item, index) => {
                                    return <li key={item.id} onClick={() => this.changeN(index)} className={n === index ? 'active' : ''}>{item.catename}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="flList-rigth">
                        <ul>
                            {
                                flList.length > 0 ?
                                flList[n].children.map(item => {
                                        return (
                                            <Link to={"/index/flxInfo/?pid=" + item.id + "&name=" + item.catename} key={item.id}>
                                                <li>
                                                    <img src={item.img} alt="" className="img" />
                                                    <p>{item.catename}</p>
                                                </li>
                                            </Link>
                                        )
                                    })
                                    : null
                            }
                        </ul>
                    </div>
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        flList: flList(state),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestFlList: () => dispatch(requestFlListAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlList)