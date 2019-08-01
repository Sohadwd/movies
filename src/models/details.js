import modelExtend from 'dva-model-extend'
import { getDetails, addFavorit } from 'services/details'
import { model } from 'models/common'
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'

export default modelExtend(model, {
  namespace: 'details',
  state: {

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/details/:id').exec(location.pathname)
        dispatch({ type: 'get', payload: { id: match[1] } })
      })
    },
  },
  effects: {
    * get ({
      payload,
    }, { call, put }) {
      const data = yield call(getDetails, payload)
      yield put({
        type: 'updateState',
        payload: data,
      })
    },
    * addToFav ({ payload }, { put, call }) {
      const data = yield call(addFavorit, payload)
      if (data.success) {
        yield put(routerRedux.push('/favorit'))
      }
    },
  },
})
