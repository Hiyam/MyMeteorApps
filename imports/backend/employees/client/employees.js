import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {checkEmployee} from '../../../api/employees.js';
import {editEmployee} from '../../../api/employees.js';
import {Employees} from '../../../api/collections.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './employees.html';
import '../methods.js';
import '../../../api/employees.js';
Template.addEmployee.events({
    'click .add_employee'(){
        let employee = {
            username: document.getElementById('emp_username').value.trim(),
            password: document.getElementById('emp_password').value.trim(),
            firstName: document.getElementById('fname').value.trim(),
            lastName: document.getElementById('lname').value.trim(),
            role: document.getElementById('role').value,
            email: document.getElementById('email').value,
            phone:document.getElementById('phone').value.trim()
        };

        checkEmployee.call(employee
            , (err, res) => {
                if (err) {
                    err.details.forEach((errorField)=>{
                        if(errorField.name === 'username'){
                            document.getElementById('username_error').innerHTML = "username must be at least 2 characters";
                        }
                        if(errorField.name === 'password'){
                            document.getElementById('password_error').innerHTML = "password must be at least 6 characters";
                        }
                        if(errorField.name ==='firstName'){
                            document.getElementById('first_name_error').innerHTML = "first name must be at least 2 characters";
                        }
                        if(errorField.name ==='lastName'){
                            document.getElementById('last_name_error').innerHTML = "last name must be at least 2 characters";
                        }
                        if(errorField.name ==='email'){
                            document.getElementById('email_error').innerHTML = "email must be of the form: exampl@example.com";
                        }
                        if(errorField.name ==='phone'){
                            document.getElementById('phone_error').innerHTML = "phone number must be of the form 11 111111";
                        }
                    });
                    console.log(err);
                }else{
                    console.log('clicked');
                     document.getElementById('addEmployeeForm').reset();
                     document.getElementById('username_error').innerHTML = "";
                     document.getElementById('password_error').innerHTML = "";
                     document.getElementById('first_name_error').innerHTML = "";
                     document.getElementById('last_name_error').innerHTML = "";
                     document.getElementById('email_error').innerHTML = "";
                     document.getElementById('phone_error').innerHTML = "";
                     FlowRouter.go('/employees')
                }
            });
    }
});
Template.viewEmployees.helpers({
    employees(){
        return Employees.find({},{$sort: {createdAt: -1}});
    },
    disabled(employee_id){
        let status = Employees.findOne({user_id: employee_id}).status;
        if(status === "enabled")
            return false;
        return true;
    },
});
Template.viewEmployees.events({
    'click .disable'(){
        Meteor.call('employee.disable',this.user_id,(err,result)=>{
            if(err)
                console.log(err);
            else{
                console.log(result);
                if(result === true){
                    Meteor.logout();
                    FlowRouter.go('/');
                }
            }
        });
    },
    'click .enable'(){
        Meteor.call('employee.enable',this.user_id);
    },
});

Template.editEmployee.events({
    'click .edit_employee'(){
        let employee = {
            id: this.employee.user_id,
            firstName: document.getElementById('fname').value.trim(),
            lastName: document.getElementById('lname').value.trim(),
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value.trim()
        } ;
        editEmployee.call(employee
            , (err, res) => {
                if (err) {
                    err.details.forEach((errorField)=>{
                        if(errorField.name ==='firstName'){
                            document.getElementById('first_name_error').innerHTML = "first name must be at least 2 characters";
                        }
                        if(errorField.name ==='lastName'){
                            document.getElementById('last_name_error').innerHTML = "last name must be at least 2 characters";
                        }
                        if(errorField.name ==='email'){
                            document.getElementById('email_error').innerHTML = "email must be of the form: exampl@example.com";
                        }
                        if(errorField.name ==='phone'){
                            document.getElementById('phone_error').innerHTML = "phone number must be of the form 11 111111";
                        }
                    });
                    console.log(err);
                }else{
                    console.log('clicked');
                    document.getElementById('editEmployeeForm').reset();
                    document.getElementById('first_name_error').innerHTML = "";
                    document.getElementById('last_name_error').innerHTML = "";
                    document.getElementById('email_error').innerHTML = "";
                    document.getElementById('phone_error').innerHTML = "";
                    FlowRouter.go('/employees');
                }
            });
    }
});