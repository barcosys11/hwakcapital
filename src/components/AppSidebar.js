import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilDescription, cilNotes, cilSpeedometer } from '@coreui/icons'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import { useEffect } from 'react'
import { useState } from 'react'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [admin, setAdmin] = useState()

  useEffect(() => {
    setAdmin(sessionStorage.getItem("admin"))
  }, [])

    const _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        // badge: {
        //   color: 'info',
        //   text: 'NEW',
        // },
      },
      {
        component: CNavTitle,
        name: 'Components',
      },
      {
        component: CNavGroup,
        name: 'Incomes',
        to: '/buttons',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Wallet History',
            to: '/wallet-history',
          },
          {
            component: CNavItem,
            name: 'Level Income',
            to: '/level-income',
          },
          {
            component: CNavItem,
            name: 'ROI Income',
            to: '/roi-income',
          },
          {
            component: CNavItem,
            name: 'Direct Income',
            to: '/cashback-income',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Team',
        to: '/buttons',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Direct Team',
            to: '/direct-team',
          },
          {
            component: CNavItem,
            name: 'Team List',
            to: '/team-list',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Buy Package',
        to: '/buy-package',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
      },
    ]
    const _nav1 = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        // badge: {
        //   color: 'info',
        //   text: 'NEW',
        // },
      },
      {
        component: CNavTitle,
        name: 'Components',
      },
      {
        component: CNavItem,
        name: 'Buy Package',
        to: '/buy-package',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Add Fund',
        to: '/add-fund',
        icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
      },
    ]
  

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <h4>HwakCapital</h4>
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={admin==0?_nav : _nav1} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
