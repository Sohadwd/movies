import modelExtend from 'dva-model-extend'
import { getFavoritLest } from 'services/favorit'
import { model } from 'models/common'

export default modelExtend(model, {
  namespace: 'favorit',
  state: {

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/favorit') {
          dispatch({ type: 'get' })
        }
      })
    },
  },
  effects: {
    * get ({
      payload,
    }, { call, put }) {
      const data = yield call(getFavoritLest, payload)
      yield put({
        type: 'updateState',
        payload: data,
      })
    },
  },
})
