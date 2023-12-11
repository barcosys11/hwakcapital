import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { cilLockLocked, cilUser } from '@coreui/icons'
import $ from 'jquery'

const ForgotPassword = () => {

    const goBacks = (e) => {
        e.preventDefault()
        $('.my-otp').css('display', 'none')
        $('.hide-this').css('display', 'block')
    }

    const displayNow = (e) => {
        e.preventDefault()
        $('.my-otp').css('display', 'block')
        $('.hide-this').css('display', 'none')
    }
    const [otp, setOtp] = useState('');
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm className='hide-this'>
                                        <h1>Forgot Password</h1>
                                        <p className="text-medium-emphasis">Enter Email To Get Password</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="Email" autoComplete="username" />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <Link to='/forgot-password'>
                                                    <CButton color="primary" className="px-4" onClick={displayNow}>
                                                        Get OTP
                                                    </CButton>
                                                </Link>
                                            </CCol>
                                        </CRow>
                                    </CForm>


                                    <CForm className='my-otp' style={{display: 'none'}}>
                                        <h1>Forgot Password</h1>
                                        <p className="text-medium-emphasis">Enter OTP And New Password</p>
                                        <div className="justify-content-center mt-4 mb-4 my-otp" style={{display: 'none'}}>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                inputStyle='otp-input'
                                                numInputs={4}
                                                renderSeparator={<span>-</span>}
                                                renderInput={(props) => <input {...props} />}
                                            />
                                        </div>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="New Password" autoComplete="username" />
                                        </CInputGroup>
                                        <p>Didnt Receive OTP? Resend</p>
                                        
                                        <CRow>
                                            <CCol xs={4}>
                                                <button className='btn btn-danger mb-2' style={{color: 'white'}} onClick={goBacks}>Go Back</button>
                                            </CCol>
                                            <CCol xs={4}>
                                                <Link to='/forgot-password'>
                                                    <CButton color="primary" className="px-4" onClick={displayNow}>
                                                        Submit
                                                    </CButton>
                                                </Link>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
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

export default ForgotPassword