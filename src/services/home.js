import { request, config } from 'utils'

const { api } = config
const { video } = api

export async function getVideos () {
  return request({
    url: video,
    method: 'get',
  })
}
