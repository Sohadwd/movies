import { request, config } from 'utils'

const { api, KEY } = config
const { details, fav } = api

export async function getDetails ({ id }) {
  return request({
    url: `${details}/${id}?api_key=${KEY}`,
    method: 'get',
  })
}

export async function addFavorit (data) {
  return request({
    url: fav,
    method: 'post',
    data,
  })
}
