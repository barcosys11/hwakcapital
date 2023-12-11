import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { Hourglass } from 'react-loader-spinner';
import axios from './axiosInstance'
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

const Login = () => {


    const [UserName, setUserName] = useState()
    const [Password, setPassword] = useState()
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()


    const login = (e) => {
        e.preventDefault()
        setVisible(true)
        e.preventDefault()
        axios.post(`api/users/login`, {
            username: UserName,
            password: Password,
        }).
            then((resp) => {
                setVisible(false)
                console.log(resp.data)
                if (resp.data.success) {
                    toast.success(resp.data.msg)
                    sessionStorage.setItem('token', resp.data.token)
                    sessionStorage.setItem('admin', resp.data.result.isAdmin)
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 3000);
                }
                else {
                    toast.error(resp.data.msg)
                }
            }).catch((err) => { console.log('eerr', err) });
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
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="Username" autoComplete="username" value={UserName} onChange={(e) => setUserName(e.target.value)} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                value={Password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" onClick={login}>
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <Link to='/forgot-password'>
                                                    <CButton color="link" className="px-0">
                                                        Forgot password?
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
                                        <h2>Sign up</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <Link to="/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
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

export default Login