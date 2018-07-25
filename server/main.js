import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Employees} from '../imports/api/collections.js';
import {Companies} from '../imports/api/collections.js';
import {Contacts} from '../imports/api/collections.js';

import '../imports/backend/employees/server/employees.js';
import '../imports/backend/companies/server/companies.js';
import '../imports/backend/contacts/server/contacts.js';
import '../imports/backend/login/server/login.js';

import '../imports/backend/employees/methods.js';
import '../imports/backend/contacts/methods.js';
import '../imports/backend/companies/methods.js';
import '../imports/backend/login/methods.js';
import '../imports/backend/dashboard/methods.js';

import '../routes/routes.js';

Meteor.startup(() => {
  if(Meteor.users.find({}).count() === 0){
        let user_id = Accounts.createUser({
            username: 'hani',
            password: 'hanihani'
        });
      Roles.addUsersToRoles(user_id,['admin','enabled']);
      Employees.insert({
          user_id: user_id,
          firstName: 'Hani',
          lastName: 'Hani',
          status: 'enabled',
          role:'admin',
          email: 'hani@gmail.com',
          phone:'111111',
          createdAt: new Date(),
          createdBy: user_id
      })
  }
});

 export function superFunctionAccountCreator(e_id, username, password, role,status) {
    let user_id = Accounts.createUser({
        username: username,
        password: password,
    });
    Employees.update({_id: e_id},{$set: {user_id: user_id}});
    let arrayOfRoles = [];
    arrayOfRoles.push(role);
    arrayOfRoles.push(status);
    Roles.addUsersToRoles(user_id,arrayOfRoles);
 }

 export function currentUserIsAdmin(user_id){
      if(Roles.userIsInRole(user_id,'admin'))
          return true;
      return false;
 }
 export function ChangeCurrentUserStatus(emp_id,role,status){
     let arrayOfRoles = [];
     arrayOfRoles.push(role);
     arrayOfRoles.push(status);
     Roles.setUserRoles(emp_id,arrayOfRoles);
 }
 export function checkIfUserIsEnabled(username) {
     let user_id = Meteor.users.findOne({username: username})._id;
     if(Roles.userIsInRole(user_id,'enabled'))
         return true;
     return false;
 }
 export function currentUserIsDisabeled(user_id) {
     if(Roles.userIsInRole(user_id,'disabled'))
         return true;
     return false;
 }
 export function LogOutCurrentUser(user_id){
     Meteor.users.update({id:user_id}, {$set: {"services.resume.loginTokens": []}});
 }
 export function getCompanies(){
     return Companies.find({}).count();
 }
 export function getContacts(){
    return Contacts.find({}).count();
 }
 export function getEmployees() {
    return Employees.find({}).count();
 }