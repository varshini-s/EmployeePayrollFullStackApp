import React, {useState, useEffect} from 'react'
import './payroll-form.scss';
import {Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../../services/employee-service.js';
import PageHeader from '../page-header/page-header';
import profileImage1 from '../../assets/profile-images/Ellipse -3.png'
import profileImage2 from '../../assets/profile-images/Ellipse -2.png'
import profileImage3 from '../../assets/profile-images/Ellipse -1.png'
import profileImage4 from '../../assets/profile-images/Ellipse -8.png'
var profile1="profile-images/Ellipse -3.png"
var profile2="profile-images/Ellipse -2.png"
var profile3="profile-images/Ellipse -1.png"
var profile4="profile-images/Ellipse -8.png"


var employeeService = new EmployeeService();
const PayrollForm=(props)=>{

    let initialValue={

        name:'',
        profileArray:[
            {url:'profile-images/Ellipse -3.png'},
            {url:'.profile-images/Ellipse -2.png'},
            {url:'profile-images/Ellipse -1.png'},
            {url:'profile-images/Ellipse -8.png'},

        ],
        allDepartment:[
            'HR','Sales','Finance','Engineer','Others'
        ],
        department:[],
        gender:'',
        salary:'',
        day:'',
        month:'',
        year:'',
        startDate:'',
        note:'',
        profilePic:'',
        isUpdate:true,
        error:{

            department:'',
            name:'',
            gender:'',
            salary:'',
            profilePic:'',
            startDate:''
        }

    }

   
    const [formValue,setForm]=useState(initialValue);
    const [displayMessage,setDisplayeMessage]=useState("");
    const history = useHistory();
    const {id} = useParams();
   


    useEffect(() => {

        employeeService.getEmployeeById(id).then((response) =>
        {
            var dateArray=response.data.data.startDate.split("-");
            console.log(response.data.data.department)
            var monthVal;
            switch (dateArray[1]) 
            {
                case "01":
                    monthVal="Jan"
                    break;
                case "02":
                    monthVal="Feb"
                    break;
                case "03":
                    monthVal="Mar"
                    break;
                case "04":
                    monthVal="Apr"
                    break;
                case "05":
                    monthVal="May"
                    break;
                case "06":
                    monthVal="Jun"
                    break;
                case "07":
                    monthVal="Jul"
                    break;
                case "08":
                    monthVal="Aug"
                    break;
                case "09":
                    monthVal="Sep"
                    break;
                case "10":
                    monthVal="Oct"
                    break;
                case "11":
                    monthVal="Nov"
                    break;
                case "12":
                    monthVal="Dec"
                    break;
            
                default:
                    break;
            }

            
            setForm({...formValue,
                    name:response.data.data.name,
                    profilePic:response.data.data.profilePic,
                    department:response.data.data.department,
                    gender:response.data.data.gender,
                    salary:response.data.data.salary,
                    startDate:response.data.data.startDate,
                    day:dateArray[2],
                    month:monthVal,
                    year:dateArray[0],
                    note:response.data.data.note});

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const changeValue=(event)=>{
        setForm({...formValue,[event.target.name]:event.target.value})
    }

    const onCheckChange=(name)=>
    {
        let index=formValue.department.indexOf(name);
        let checkArray=[...formValue.department]
        if(index>-1)
            checkArray.splice(index,1)
        else
            checkArray.push(name);

        setForm({...formValue,department:checkArray});
    }


    const validData=async()=>{
        let isError=false;
        let error={
            department:'',
            name:'',
            gender:'',
            salary:'',
            profilePic:'',
            startDate:''

        }

        if(formValue.name.length<1)
        {
            error.name='name is required field'
            isError=true;
        }

        if(formValue.gender.length<1)
        {
            error.gender='gender is required field'
            isError=true;
        }

        if(formValue.salary.length<1)
        {
            error.salary='salary is required field'
            isError=true;
        }
        if( parseInt(formValue.salary) <30000 || parseInt(formValue.salary) >50000)
        {
            error.salary='salary should be between 30,000 and 50,000'
            isError=true;
        }

        if(formValue.profilePic.length<1)
        {
            error.profilePic='profile is required field'
            isError=true;
        }

        if(formValue.department.length<1)
        {
            error.department='department is required field'
            isError=true;
        }

        await setForm({...formValue,error:error})
        return isError;
    }

    const save = async(event)=>{
        event.preventDefault();
        console.log("save");

        if(await validData())
        {
            console.log('error',formValue);
            return;
        }
    
        let object ={
    
            name:formValue.name,
            department:formValue.department,
            gender:formValue.gender,
            salary:formValue.salary,
            startDate:`${formValue.day} ${formValue.month} ${formValue.year}`,
            note:formValue.note,
            // id:formValue.id,
            profilePic:formValue.profilePic,
        }

        if(id)
        {
            employeeService.updateEmployee(id, object).then((response) => {
                console.log("update success"+response)
                history.push('/')
            }).catch(error => {
                console.log(error)
            })

        }
        else 
       {
        employeeService.addEmployee(object).then(data=>{
            console.log("data added"+object);
            history.push('/');
            setDisplayeMessage("Successfullly added User")
            setTimeout(()=>{
                window.location.reload();},3000);
            
        })
        .catch(err =>{
            console.log("err while add"+err.response);
            setDisplayeMessage("Error while  adding")

        })
           
       }  

    }


    const reset=()=>{
        setForm({...initialValue,isUpdate: formValue.isUpdate})
        console.log(formValue)
    }

    return(

        <div className="payroll-main">
            <PageHeader/>
            <div className="content">
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head">Employee payroll form</div>
                    <div className="row">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.."/>

                    </div>
                    <div className="error">{formValue.error.name}</div>
                    <div className="row">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-button">
                            <label>
                                <input type='radio' checked={formValue.profilePic==profile1} name="profilePic"
                                value={profile1} onChange={changeValue}/>
                                <img className="profile" src={profileImage1}/>
                            </label>
                            <label>
                                <input type='radio' checked={formValue.profilePic==profile2} name="profilePic"
                                value={profile2} onChange={changeValue}/>
                                <img className="profile" src={profileImage2}/>
                            </label>
                            <label>
                                <input type='radio' checked={formValue.profilePic==profile3} name="profilePic"
                                value={profile3} onChange={changeValue}/>
                                <img className="profile" src={profileImage3}/>
                            </label>
                            <label>
                                <input type='radio' checked={formValue.profilePic==profile4} name="profilePic"
                                value={profile4} onChange={changeValue}/>
                                <img className="profile" src={profileImage4}/>
                            </label>
                        </div>
                    </div>
                    <div className="error">{formValue.error.profilePic}</div>
                    <div className="row">
                        <label className="label text" htmlFor="gender" >Gender</label>
                        
                        <div>
                            <input type="radio" id="male" onChange={changeValue} checked={formValue.gender=="male"} name="gender" value="male"/>
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" onChange={changeValue} checked={formValue.gender=="female"} name="gender" value="female"/>
                            <label className="text" htmlFor="female">Female</label>
                            
                        </div>
                    </div>
                    <div className="error">{formValue.error.gender}</div>
                    <div className="row">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {formValue.allDepartment.map(item=>(
                                <span className="deptlabel" key={item}>

                                    <input className= "checkbox " type="checkbox" onChange={()=> onCheckChange(item)} 
                                        name={item}
                                    checked={formValue.department.includes(item)} value={item}/>

                                    <label className="text " htmlFor={item}>{item}</label>
                                </span>
                            ))}
                        </div>
                            
                    </div>

                    <div className="error">{formValue.error.department}</div>
                    <div className="row">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="number" onChange={changeValue} id="salary" value={formValue.salary} name="salary" placeholder="Salary"/>

                    </div>
                    <div className="error">{formValue.error.salary}</div>
                    <div className="row"><label className="label text" htmlFor="startDate">Start date</label><div>
                        <select onChange={changeValue} value={formValue.day} id="day" name="day">
                            <option value="" disabled selected>Day</option>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select onChange={changeValue}  value={formValue.month} id="month" name="month">
                            <option value="" disabled selected>Month</option>
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                        </select>
                        <select onChange={changeValue}  value={formValue.year} id="year" name="year">
                            <option value="" disabled selected>Year</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                        </select>
                        </div>

                    </div>
                    <div className="error">{formValue.error.startDate}</div>
                    <div className="row">
                        <label className="label text" htmlFor="note">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.note} className="input" name="note" placeholder=""
                            style={{heigt:'100%'}}></textarea>

                    </div>

                    <div className="buttonParent">
                        {/* <a routerLink="/home" className="resetButton button cancelButton">Cancel</a> */}
                        <Link to="/" >
                            <button  className="resetButton button cancelButton">Cancel</button>
                        </Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton">{id?'Update':'Submit'}</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>

                    <div className="displayMessage">{displayMessage}</div>

                </form>
            </div>
        </div>

        
    )
}

export default PayrollForm
