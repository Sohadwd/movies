import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Card, Row, Col } from 'antd'
import { color, config } from 'utils'
import { Page } from 'components'
import styles from './index.less'
import { Link } from 'react-router-dom'

const { Meta } = Card
const { APIV1 } = config

function Home ({ home }) {
  const result = home && Object.values(home)

  return (
    <Page>
      <Row gutter={16} style={{ left: 30 }}>
        {result.map(item => (
          <Col lg={8} md={10} sm={24} xs={24}>
            <Link to={`/details/${item.id}`}>
              <Card
                hoverable
                style={{ width: 240, margin: 30, height: 365 }}
                cover={<img
                  alt="poster"
                  style={{ height: 280 }}
                  className={styles.customProductImg}
                  src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.backdrop_path}`}
                />}
              >
                <Meta title={item.title} description={`Rating: ${item.vote_average}`} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Page>
  )
}

Home.propTypes = {
  home: PropTypes.array,
}

export default connect(({ home, loading }) => ({ home, loading }))(Home)
