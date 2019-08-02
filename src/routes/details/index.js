import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Icon, Popover, Row, Typography, Rate, Anchor } from 'antd'
import { Page } from 'components'
import styles from './index.less'

const { Title, Text } = Typography
const { Link } = Anchor

function details (details) {
  const data = details.details

  const content = (
    <div>
      <p>Make as favorite</p>
    </div>
  )

  return (
    <Page className={styles.dashboard}>
      <Row gutter={16}>
        <Col span={18} push={6}>
          <div style={{ marginLeft: 50 }}>
            <Title level={2}>{data.title}
              <Popover content={content} trigger="hover">
                <Icon type="heart"
                  theme="twoTone"
                  twoToneColor="#eb2f96"
                  style={{ fontSize: '36px', color: '#08c', marginLeft: 30 }}
                />
              </Popover>
            </Title>
            <Title level={4}>Rated: <Rate defaultValue={`${data.vote_average / 2}`} /></Title>
            <div style={{ width: 450 }}>
              <Title level={4}> Overview </Title>
              <Text> {data.overview} </Text>
            </div>
            <div style={{ marginTop: 20, color: '#000', fontSize: 15 }}> Genres :
              { data.genres && Object.values(data.genres).map(item =>
                <Text code> {item.name}</Text>)
              }</div>

            <Anchor affix={false} style={{ marginTop: 20, width: 450 }}>
              <Link href={data.homepage} title="Watch trial" />
            </Anchor>
          </div>

        </Col>
        <Col span={6} pull={18}>
          <img alt="logo"
            style={{ height: 450, width: 300 }}
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.poster_path}`}
          />
        </Col>
      </Row>
    </Page>
  )
}


export default connect(({ details, loading }) => ({ details, loading }))(details)
