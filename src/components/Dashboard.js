import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import {
    CCol,
    CRow,
    CWidgetStatsF,
    CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight, cilChartPie, cilDollar } from '@coreui/icons'
import axios from './axiosInstance'
import moment from 'moment';


const Dashboard = () => {
    const token = sessionStorage.getItem("token");
    const [userData, setUserData] = useState()
    const [walletHistory, setWalletHistory] = useState([])
    const [incomes, setIncomes] = useState([])
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

        axios.get(`api/users/get-dashboard`, {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                console.log(resp.data.result)
                setIncomes(resp.data.result)
            }).catch((err) => { console.log('eerr', err) });

        axios.post(`api/users/user-report`, {
            reportType: "All"
        },
            {
                headers: {
                    "x-access-token": token,
                },
            }).
            then((resp) => {
                setWalletHistory(resp.data?.result)
            }).catch((err) => { console.log('eerr', err) });
    }, [])
    function copyReferral(e) {
        e.preventDefault();
        // Get the text field
        var copyText = document.getElementById("myInput");
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
    }
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

    return (
        <>
            <div>
                <div className="body flex-grow-1 px-3">
                    <CRow>
                        <CCol xs={3}>
                            <CWidgetStatsF
                                className="mb-3"
                                color="primary"
                                icon={<CIcon icon={cilDollar} height={24} />}
                                title="Balance"
                                value={userData?.wallet ? '$' + userData?.wallet : '$' + 0} />
                        </CCol>
                        <CCol xs={3}>
                            <CWidgetStatsF
                                className="mb-3"
                                color="warning"
                                icon={<CIcon icon={cilDollar} height={24} />}
                                title="ROI Income"
                                value={incomes.roiAmount? "$"+incomes?.roiAmount: "$"+0} />
                        </CCol>
                        <CCol xs={3}>
                            <CWidgetStatsF
                                className="mb-3"
                                color="success"
                                icon={<CIcon icon={cilDollar} height={24} />}
                                title="Level Inc."
                                value={incomes.levelAmount? "$"+incomes?.levelAmount: "$"+0} />
                        </CCol>
                        <CCol xs={3}>
                            <CWidgetStatsF
                                className="mb-3"
                                color="danger"
                                icon={<CIcon icon={cilDollar} height={24} />}
                                title="Direct Inc."
                                value={incomes.directAmount? "$"+incomes?.directAmount: "$"+0} />
                        </CCol>
                    </CRow>
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="card">
                                        <div className='card-header'>
                                            <h4>Last 5 Transactions Report</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <DataTable
                                                    pagination={true}
                                                    data={walletHistory}
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

                    <div className="col-xl-12 col-lg-12 mt-4">
                        <div className="card">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="card">
                                        <div className='card-header'>
                                            <h4>Referral Code</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className='col-md-12'>
                                                <input type='text' id='myInput' value={"https://hwakcapital.com/register?refferalcode=" + userData?.referralCode} className='form-control' />
                                            </div>
                                            <button
                                                className="btn btn-primary mt-4"
                                                style={{ width: "100px" }}
                                                onClick={copyReferral}
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    )

}
export default Dashboard