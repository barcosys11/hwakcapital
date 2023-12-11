import React, { useState, useEffect } from 'react'
import DataTable from "react-data-table-component";
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import axios from './axiosInstance'
import moment from 'moment';

const TeamList = () => {

    const [directTeam, setDirectTeam] = useState([])
    const token = sessionStorage.getItem("token")
    
    useEffect(() => {
        axios.get(`api/users/get-team-list`,
        {
            headers: {
                "x-access-token": token,
            },
        }).
            then((resp) => {
                console.log(resp.data)
                setDirectTeam(resp.data?.result)
            }).catch((err) => { console.log('eerr', err) });
    }, [])
    const columns = [
        {
            name: "Username",
            selector: (row) => row.username,
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Wallet",
            selector: (row) => `$` + row.wallet,
        },
        {
            name: "Stacking Amount",
            selector: (row) => row.statkingAmt,
        },
        {
            name: "Date",
            selector: (row) => moment(row.createdAt).format("DD-MM-YYYY"),
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
                                                <h4>Team List Report</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <DataTable
                                                        pagination={true}
                                                        data={directTeam}
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
export default TeamList