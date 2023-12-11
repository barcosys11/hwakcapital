import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { Hourglass } from 'react-loader-spinner';
import $ from 'jquery'
import OtpInput from 'react-otp-input';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked, cilUser, cibMyspace, cibMinutemailer
} from '@coreui/icons'
import axios from './axiosInstance'

const Register = () => {

  useEffect(() => {
    var url = window.location.href;
    var url_string = url;
    console.log(url_string)
    var url = new URL(url_string);
    console.log(url.searchParams.get("refferalcode"), "url")
    setReferral(
      url.searchParams.get("refferalcode")
        ? url.searchParams.get("refferalcode")
        : Referral
    );
  }, [])

  const navigate = useNavigate()

  const [Name, setName] = useState()
  const [UserName, setUserName] = useState()
  const [Email, setEmail] = useState()
  const [Password, setPassword] = useState()
  const [Referral, setReferral] = useState()
  const [otp, setOtp] = useState()
  const [visible, setVisible] = useState(false)

  const register = (e) => {
    setVisible(true)
    e.preventDefault()
    axios.post(`api/users/register`, {
      name: Name,
      username: UserName,
      email: Email,
      password: Password,
      referralCode: Referral
    }).
      then((resp) => {
        setVisible(false)
        console.log(resp.data)
        if (resp.data.success) {
          toast.success(resp.data.msg)
          $('.register-now').css('display', 'none')
          $('.complete-register').css('display', 'block')
        }
        else {
          toast.error(resp.data.msg)
        }
      }).catch((err) => { console.log('eerr', err) });
  }

  const completeRegister = (e) => {
    setVisible(true)
    e.preventDefault()
    axios.post(`api/users/complete-register`, {
      email: Email,
      otp: otp
    }).
      then((resp) => {
        setVisible(false)
        console.log(resp.data)
        if (resp.data.success) {
          toast.success(resp.data.msg)
          setTimeout(() => {
            navigate('/')
          }, 2000);
        }
        else {
          toast.error(resp.data.msg)
        }
      }).catch((err) => { console.log('eerr', err) });
  }

  const goBack = (e) => {
    e.preventDefault()
    $('.register-now').css('display', 'block')
    $('.complete-register').css('display', 'none')
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Hourglass
        visible={visible}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass="loader-spinner"
        colors={['#306cce', '#72a1ed']}
      />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="register-now p-4">
                <CCardBody>
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Name" autoComplete="name" value={Name} onChange={(e) => setName(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" value={UserName} onChange={(e) => setUserName(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cibMinutemailer} />
                      </CInputGroupText>
                      <CFormInput type='email' placeholder="Email" autoComplete="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={Password} onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cibMyspace} />
                      </CInputGroupText>
                      <CFormInput placeholder="Referral Code" autoComplete="referral" value={Referral} onChange={(e) => setReferral(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={register}>
                          Register
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="complete-register p-4" style={{ display: 'none' }}>
                <CCardBody>
                  <CForm>
                    <h1>Complete Your Registration</h1>
                    <p className="text-medium-emphasis">Enter OTP sent on your {Email}</p>
                    <CRow>
                      <div className="justify-content-center mt-2 mb-4 my-otp">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          inputStyle='otp-input'
                          numInputs={4}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </div>
                      <CCol xs={12} className='d-flex'>
                        <CButton color="danger" className="px-4" onClick={goBack} style={{ color: 'white' }}>
                          Go Back
                        </CButton>
                        <CButton color="primary" className="px-4 mx-2" onClick={completeRegister}>
                          Register
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <h2>Login</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Login
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register