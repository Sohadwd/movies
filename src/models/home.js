import modelExtend from 'dva-model-extend'
import { getVideos } from 'services/home'
import { model } from 'models/common'

export default modelExtend(model, {
  namespace: 'home',
  state: {

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/home' || pathname === '/') {
          dispatch({ type: 'get' })
        }
      })
    },
  },
  effects: {
    * get ({
      payload,
    }, { call, put }) {
      const data = yield call(getVideos, payload)
      yield put({
        type: 'updateState',
        payload: data.results,
      })
    },
  },
})
