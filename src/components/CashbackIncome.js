import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import axios from './axiosInstance'
import moment from 'moment';

const CashbackIncome = () => {
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
    var data = [{
        id: 1,
        name: 'test1',
        packageAmt: '$2000',
        balance: '$200',
    },
    {
        id: 1,
        name: 'test2',
        packageAmt: '$1000',
        balance: '$400',
    }];
    const [cashbackReport, setCashbackReport] = useState([])
    const token = sessionStorage.getItem("token")
    
    useEffect(() => {
        axios.post(`api/users/user-report`, {
            reportType: "2"
        },
        {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                setCashbackReport(resp.data?.result)
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
                                                <h4>Direct Income Report</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <DataTable
                                                        pagination={true}
                                                        data={cashbackReport}
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
export default CashbackIncome