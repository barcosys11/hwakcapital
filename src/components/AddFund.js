import React, { useState, useEffect } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import axios from './axiosInstance'
import { Toaster, toast } from 'react-hot-toast'
import { Hourglass } from 'react-loader-spinner';
import DataTable from "react-data-table-component";
import moment from "moment";
const columns = [
    {
        name: "Package ID",
        selector: (row) => row?.packageData?.name,
    },
    {
        name: "Package Amt",
        selector: (row) => `$` + row.amount,
    },
    {
        name: "Months",
        selector: (row) => row.months,
    },
    {
        name: "Date",
        selector: (row) => moment(row.createdAt).format("DD-MM-YYYY"),
    },
    {
        name: "Remark",
        selector: (row) => row.remark,
    },
];

const AddFund = () => {

    const addFund = (e) => {
        setVisible(true)
        e.preventDefault()
        axios.post(`api/users/add-fund`, {
            username: userName,
            amount: Amount,
        }, {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                setVisible(false)
                console.log(resp.data)
                if (resp.data.success) {
                    toast.success(resp.data.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);
                }
                else {
                    toast.error(resp.data.msg)
                }
            }).catch((err) => { console.log('eerr', err); setVisible(false); });

    }

    const [userName, setUserName] = useState();
    const [Amount, setAmount] = useState();
    const [visible, setVisible] = useState(false);
    const token = sessionStorage.getItem("token")
   
    return (
        <>
            <div>
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
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <div className="body flex-grow-1 px-3">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <h4>Add Funds</h4>
                                        </div>
                                        <div className='card-body p-4'>
                                            <div className='row'>
                                                <div className='col-md-12 mb-3'>
                                                    <label>Username</label>
                                                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} className='form-control' />
                                                </div>
                                                <div className='col-md-12 mb-3'>
                                                    <label>Amount</label>
                                                    <input type='text' placeholder='Please Enter Amount' value={Amount} onChange={(e) => setAmount(e.target.value)} className='form-control' />
                                                </div>
                                                <div className='col-md-3'>
                                                    <button className='btn btn-danger' style={{ color: 'white' }} onClick={addFund}>
                                                        Submit
                                                    </button>
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
export default AddFund