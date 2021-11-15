package com.bridgelabz.employeepayrollapp.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import com.bridgelabz.employeepayrollapp.dto.EmployeePayrollDTO;
import com.bridgelabz.employeepayrollapp.exception.EmployeePayrollException;
import com.bridgelabz.employeepayrollapp.model.EmployeePayrollData;
import com.bridgelabz.employeepayrollapp.repository.EmployeePayrollRepository;

@Service
@Slf4j
public class EmployeePayrollService implements IEmployeePayrollService 
{

	@Autowired
	private EmployeePayrollRepository employeePayrollRepository;

	@Override
	public List<EmployeePayrollData> getEmployeePayrollData() 
    {
        return employeePayrollRepository.findAll();
	}

	@Override
	public EmployeePayrollData getEmployeePayrollDataById(int empId) 
    {
		return  employeePayrollRepository
				.findById(empId)
				.orElseThrow(()->new EmployeePayrollException("Employee with employee id "+empId+"does not exists..!"));
	}

	@Override
	public EmployeePayrollData createEmployeePayrollData(EmployeePayrollDTO employeePayrollDTO) 
    {
		
        EmployeePayrollData empData=null;
        empData= new EmployeePayrollData(employeePayrollDTO);
		log.debug("Emp data :"+empData.toString());
		return employeePayrollRepository.save(empData);
	}

	@Override
	public EmployeePayrollData updateEmployeePayrollData(int empId,EmployeePayrollDTO employeePayrollDTO) 
    {
		EmployeePayrollData empData=this.getEmployeePayrollDataById(empId);
        empData.updateEmployeePayrollData(employeePayrollDTO);
		return employeePayrollRepository.save(empData);
	}

	@Override
	public void deleteEmployeePayrollData(int empId) 
    {
		EmployeePayrollData empData=this.getEmployeePayrollDataById(empId);
		employeePayrollRepository.delete(empData);
		
	}

	@Override
	public List<EmployeePayrollData> getEmployeeByDepartment(String department)
	 {
		return employeePayrollRepository.findEmployeeDepartment(department);
	}

}
