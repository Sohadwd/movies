import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Loader, MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import { classnames, config } from 'utils'
import { Helmet } from 'react-helmet'
import { withRouter } from 'dva/router'
import '../themes/index.less'
import './app.less'

const { Content, Sider } = Layout
const { Header, styles } = MyLayout
const { prefix, openPages } = config

let lastHref

const App = ({
  children, dispatch, app, loading,
}) => {
  const {
    siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu,
  } = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { href } = window.location

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const breadProps = {
    menu,
    location,
  }

  if (openPages && openPages.includes(pathname)) {
    return (<div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      {children}
    </div>)
  }

  return (
    <div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Helmet>
        <title>Sohad WD</title>
      </Helmet>

      <Layout className={classnames({ [styles.dark]: darkTheme, [styles.light]: !darkTheme })}>
        {!isNavbar && <Sider
          trigger={null}
          collapsible
          collapsed={siderFold}
        >
          {siderProps.menu.length === 0 ? null : <MyLayout.Sider {...siderProps} />}
        </Sider>}
        <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
          <BackTop target={() => document.getElementById('mainContainer')} />
          <Header {...headerProps} />
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
