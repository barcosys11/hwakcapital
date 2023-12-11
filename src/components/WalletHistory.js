import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import moment from 'moment';
import axios from './axiosInstance'

const WalletHistory = () => {
    const columns = [
        {
            name: "Credit",
            selector: (row) => "$" + row.credit,
        },
        {
            name: "Debit",
            selector: (row) => "$" + row.debit,
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

    const [roiReport, setRoiReport] = useState([])
    const token = sessionStorage.getItem("token")
    
    useEffect(() => {
        axios.post(`api/users/user-report`, {
            reportType: "1"
        },
        {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                setRoiReport(resp.data?.result)
            }).catch((err) => { console.log('eerr', err) });
    }, [])

    return (
        <>
            <div>
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <div className="body flex-grow-1 px-3">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="card">
                                            <div className='card-header'>
                                                <h4>Wallet History Report</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <DataTable
                                                        pagination={true}
                                                        data={roiReport}
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
                    <AppFooter />
                </div>
            </div>
        </>
    )

}
export default WalletHistory