import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Login from './components/Login'
import Register from './components/Register'
import LevelIncome from './components/LevelIncome'
import CashbackIncome from './components/CashbackIncome'
import RoiIncome from './components/RoiIncome'
import TeamList from './components/TeamList'
import DirectTeam from './components/DirectTeam'
import UserProfile from './components/UserProfile'
import BuyPackage from './components/BuyPackage'
import ForgotPassword from './components/ForgotPassword'
import AddFund from './components/AddFund'
import WalletHistory from './components/WalletHistory'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
            {/* <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
            <Route path="/dashboard" name="Home" element={<DefaultLayout />} />
            <Route path="/level-income" name="Level Income" element={<LevelIncome />} />
            <Route path="/roi-income" name="ROI Income" element={<RoiIncome />} />
            <Route path="/cashback-income" name="Cashback Income" element={<CashbackIncome />} />
            <Route path="/direct-team" name="Direct Team" element={<DirectTeam />} />
            <Route path="/team-list" name="Team List" element={<TeamList />} />
            <Route path="/user-profile" name="Team List" element={<UserProfile />} />
            <Route path="/buy-package" name="Team List" element={<BuyPackage />} />
            <Route path="/forgot-password" name="Forgot Password" element={<ForgotPassword />} />
            <Route path="/add-fund" name="Add Fund" element={<AddFund />} />
            <Route path="/wallet-history" name="Wallet History" element={<WalletHistory />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
