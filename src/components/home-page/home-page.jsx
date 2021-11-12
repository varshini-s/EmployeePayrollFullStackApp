import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/employee-service.js';
import EmployeeTable from './employee-table.jsx';
import addIcon from '../../assets/icons/add-24px.svg'
import './home-page.scss';
import PageHeader from '../page-header/page-header';

var employeeService = new EmployeeService();


class HomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employeeArray: []

        }
    }

    getEmployee = () => {

        employeeService.getAllEmployee().then(obj => {
            console.log("get data" + obj.data);
            this.setState({ employeeArray: obj.data })

        })
            .catch(err => {
                console.log("err while get");
                this.setState({ employeeArray: [] })

            })
    
        }

  
    openSearch() {

    }
    search() {

    }

    render() {
        return (

            <div onLoad={this.getEmployee}>
                <PageHeader />

                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text">
                            Employee Details <div className="emp-count"></div>
                        </div>
                        <div className="row center button box">
                            {/* <div className="search-box" onClick={this.openSearch}>
                                <input className={"input"+(this.state.searchExpand && 'input-expand')}
                                 onChange={this.search} type="text" placeholder=""/>
                                 <img className="search-icon" src={searchIcon} alt=""/>
                            </div> */}
                            <Link to="payroll-form" className="add-button flex-row-center">
                                <img src={addIcon} alt="" />Add User
                            </Link>
                        </div>
                    </div>
                    <div className="table-main" >
                        <EmployeeTable employeeArray={this.state.employeeArray} />
                    </div>
                </div>
            </div>
        )

    }

}

export default HomePage
