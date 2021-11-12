import React, { Component } from 'react';
import logo from '../../assets/images/logo.png'
import './page-header.scss';


class PageHeader extends Component 
{
        render() {
            return (
                <header className="header row center">

                    <div className="logo">
                    <img src={logo} alt=""/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>

                </header>
            )
        }
}

export default PageHeader;



