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

const BuyPackage = () => {

    const buyPackage = (e) => {
        setVisible(true)
        e.preventDefault()
        axios.post(`api/users/buy-package`, {
            username: username,
            amount: Amount,
            packageId: selectedPackage
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
                    // setTimeout(() => {
                    //     window.location.reload()
                    // }, 2000);
                }
                else {
                    toast.error(resp.data.msg)
                }
            }).catch((err) => { console.log('eerr', err); setVisible(false); });

    }

    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState();
    const [username, setUsername] = useState();
    const [Amount, setAmount] = useState();
    const [visible, setVisible] = useState(false);
    const [packagesList, setPackagesList] = useState([]);
    const token = sessionStorage.getItem("token")
    useEffect(() => {

        axios.get(`api/users/get-packages`, {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                console.log(resp.data.result)
                setData(resp.data.result)
            }).catch((err) => { console.log('eerr', err) });

        axios.get(`api/users/get-user-details`, {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                setUserData(resp.data?.result)
                setUsername(resp.data?.result?.username)
            }).catch((err) => { console.log('eerr', err) });

        axios.get(`api/users/buy-package-list`, {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                setPackagesList(resp.data?.result)
            }).catch((err) => { console.log('eerr', err) });
    }, [])
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
                                            <h4>Buy Package</h4>
                                        </div>
                                        <div className='card-body p-4'>
                                            <div className='row'>
                                                <div className='col-md-12 mb-3'>
                                                    <label>Username</label>
                                                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='form-control' />
                                                </div>
                                                <div className='col-md-12 mb-3'>
                                                    <label>Package</label>
                                                    <select className='form-select' onChange={(e) => setSelectedPackage(e.target.value)}>
                                                        <option disabled selected>Select Package</option>
                                                        {data?.map((data) => {
                                                            return (
                                                                <option key={data.id} value={data.id}>{data.name} (${data.minAmt} - ${data.maxAmt})</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className='col-md-12 mb-3'>
                                                    <label>Topup</label>
                                                    <input type='text' value={userData?.wallet} className='form-control' readOnly />
                                                </div>
                                                <div className='col-md-12 mb-3'>
                                                    <label>Amount</label>
                                                    <input type='text' placeholder='Please Enter Amount' value={Amount} onChange={(e) => setAmount(e.target.value)} className='form-control' />
                                                </div>
                                                <div className='col-md-3'>
                                                    <button className='btn btn-danger' style={{ color: 'white' }} onClick={buyPackage}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 mt-4">
                                <div className="card">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="card">
                                                <div className='card-header'>
                                                    <h4>Packages List</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="table-responsive">
                                                        <DataTable
                                                            pagination={true}
                                                            data={packagesList}
                                                            columns={columns}
                                                            paginationServer={true}
                                                            paginationRowsPerPageOptions={[
                                                                10, 50, 100, 500,
                                                            ]}
                                                            defaultSortFieldId="Date"
                                                            defaultSortAsc={false}
                                                        />
                                                    </div>
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
export default BuyPackage