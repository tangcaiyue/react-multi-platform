import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './index.css'
import px2rem from '../../../../common/px2rem'
import Pager from '../../../../components/Pager'
import { getProductList } from '../../../../../common/actions'

class ProductListRows extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    productList: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.fetchProList = this.fetchProList.bind(this)
  }

  fetchProList({ startNum }) {
    const { dispatch, item } = this.props
    const activityId = item.list[0].activityId
    return dispatch(getProductList({
      activityId,
      startNum,
    }))
  }

  render() {
    const { item, productList } = this.props
    const model = productList[item.list[0].activityId]
    return (
      <div
        className={`flex ${s.root}`}
        style={{ marginBottom: `${px2rem(item.margin)}rem` }}
      >
        <Pager onLoad={this.fetchProList} model={model}>
          <div>
            {JSON.stringify(model)}
          </div>
        </Pager>
      </div>
    )
  }
}

export default connect(state => ({
  productList: state.activityProductList,
}))(withStyles(s)(ProductListRows))
