import { request, config } from 'utils'

const { api, KEY } = config
const { fav } = api

export async function getFavoritLest () {
  return request({
    url: `${fav}/'{account_id}'/favorite?api_key=${KEY}`,
    method: 'get',
  })
}
