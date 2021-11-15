import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/employee-service.js';
import addIcon from '../../assets/icons/add-24px.svg'
import searchIcon from '../../assets/icons/Search.png'
import './home-page.scss';
import PageHeader from '../page-header/page-header';
import editIcon from '../../assets/icons/create-black-18dp.svg'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import 'typeface-roboto';

var employeeService = new EmployeeService();


const HomePage = (props) => {
    const [employees, setEmployees] = useState([])
    const [textInput, setTextInput] = useState("");

    const setSearchQuery = (event) => {
        
        var departmentToSearch=event.target.value;
        setTextInput({textInput,departmentToSearch})
        
        //searchByDepartment();


    }   

    useEffect(() => {

        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        employeeService.getAllEmployee().then((response) => {
            console.log(response.data.data);
            setEmployees(response.data.data);
            
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
        employeeService.deleteEmployee(employeeId).then((response) =>{
         getAllEmployees();
 
        }).catch(error =>{
            console.log(error);
        })
         
     }

     const searchByDepartment = () => 
     {     
        employeeService.getEmployeeByDepartment(textInput.departmentToSearch).then((response) => {
            console.log(response.data.data);
            setEmployees(response.data.data);
            
        }).catch(error =>{
            console.log(error);
        })
      }
     



        return (

            <div >
                <PageHeader />

                <div className="main-content">
                    <div className="header-content">
                        <div className="emp-detail-text">
                            Employee Details <div className="emp-count"></div>
                        </div>
                        <div className="row center button box">
                            {/* <div className="search-box"  onClick={setSearchQuery} > */}
                                <input className="input"
                                 onChange={setSearchQuery}  type="input" placeholder="" value={textInput.value} placeholder="Enter Department name"/>
                                 {/* <div className="search-box"  onClick={setSearchQuery} /> */}

                                 <img className="search-icon" src={searchIcon}  onClick={searchByDepartment} alt=""/>
                            {/* </div> */}


                            <Link to="payroll-form" className="add-button flex-row-center">
                                <img src={addIcon} alt="" />Add User
                            </Link>
                        </div>
                    </div>
                    <div className="table-main" >
                        <table id="display" className="table">
                            <tbody>
                                <tr key={-1}>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Start Date</th>
                                    <th>Actions</th>

                                </tr>
                                {
                                    employees && employees.map((employee, ind) => (
                                        <tr key={ind}>
                                            <td><img className="profile" src={employee.profilePic} alt="" /></td>
                                            <td>{employee.name}</td>
                                            <td>{employee.gender}</td>
                                            <td><div className="depts">
                                                {employee.department && employee.department.map(dept => (
                                                    <div className="dept-label">{dept}</div>
                                                ))}
                                            </div></td>
                                            <td> {'\u20B9'}{employee.salary}</td>
                                            <td>{employee.startDate}</td>
                                            <td>
                                                <Link    className="btn btn-info" 
                                                        to={`/edit-employee/${employee.employeeId}`} >
                                                
                                                <img src ={editIcon} alt="edit"/>

                                                </Link>
                                                <img onClick={() => deleteEmployee(employee.employeeId)} src ={deleteIcon} alt="delete"/>

                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
            }



export default HomePage
