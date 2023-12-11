import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilDescription, cilNotes, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const admin = sessionStorage.getItem("admin");
console.log("admin", admin)

var _nav = []

  if (sessionStorage.getItem("admin") == 0) {
    _nav = [
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
  }
  else {
    _nav = [
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
  }
export default _nav