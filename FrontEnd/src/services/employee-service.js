import config from "../config/config";
import AxiosService from './axios-service'

export default class EmployeeService{

    baseUrl=config.baseUrl;
    addEmployee(data)
    {
        return AxiosService.postService(`${this.baseUrl}employee`,data);
    }

    getAllEmployee()
    {
        return AxiosService.getService(`${this.baseUrl}employee`);

    }
     getEmployeeById(id)
    {
        return   AxiosService.getService(`${this.baseUrl}employee/${id}`);

    }
    getEmployeeByDepartment(department)
    {
        return   AxiosService.getService(`${this.baseUrl}employee/department/${department}`);

    }

    updateEmployee(id,data)
    {
        console.log(data)
        return AxiosService.putService(`${this.baseUrl}employee/${id}`,data);
    }
    deleteEmployee(id)
    {
        return AxiosService.deleteService(`${this.baseUrl}employee/${id}`);
    }

}




