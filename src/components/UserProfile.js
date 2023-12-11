import React, { useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import axios from './axiosInstance'

const UserProfile = () => {
    const token = sessionStorage.getItem("token");
    const [userData, setUserData] = useState()
    useEffect(() => {

        axios.get(`api/users/get-user-details`, {
            headers: {
                "x-access-token": token,
              },
        }).
            then((resp) => {
                console.log(resp.data.result)
                setUserData(resp.data.result)
            }).catch((err) => { console.log('eerr', err) });
    }, [])
    return (
        <>
            <div>
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <div className="body flex-grow-1 px-3">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h4>Account Info</h4>
                                        </div>
                                        <div className='card-body p-4'>
                                            <div className='row'>
                                                <div className='col-md-6 mb-4'>
                                                    <label>Name</label>
                                                    <input type='text' value={userData?.name} className='form-control' />
                                                </div>
                                                <div className='col-md-6 mb-4'>
                                                    <label>Username</label>
                                                    <input type='text' value={userData?.username} className='form-control' />
                                                </div>
                                                <div className='col-md-6 mb-4'>
                                                    <label>Email</label>
                                                    <input type='email' value={userData?.email} className='form-control' />
                                                </div>
                                                <div className='col-md-6'>
                                                    <label>Password</label>
                                                    <input type='text' value={userData?.password} className='form-control' />
                                                </div>
                                                <div className='col-md-12'>
                                                    <label>Referral Code</label>
                                                    <input type='text' value={"https://hwakcapital.com/register?refferalcode=" + userData?.referralCode} className='form-control' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h4>Change Password</h4>
                                        </div>
                                        <div className='card-body p-4'>
                                            <div className='row'>
                                                <div className='col-md-12 mb-4'>
                                                    <label>Current Password</label>
                                                    <input type='text' placeholder='dont track' className='form-control' />
                                                </div>
                                                <div className='col-md-12'>
                                                    <label>New Password</label>
                                                    <input type='text' placeholder='Please Enter New Password' className='form-control' />
                                                </div>
                                                <div className='col-md-3 mt-4'>
                                                    <button className='btn btn-danger' style={{color: 'white'}}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AppFooter />
                </div>
            </div>
        </>
    )
}
export default UserProfile