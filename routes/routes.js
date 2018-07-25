import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Companies} from '../imports/api/collections.js';
import {Employees} from '../imports/api/collections.js';
import {Contacts} from '../imports/api/collections.js';
FlowRouter.route('/dashboard',{
       name: 'home',
       waitOn(){
         return [import('../imports/backend/dashboard/client/dashboard.html'),import('../imports/ui/mainui.html')];
       },
       action(){
           this.render('layout','dashboard');
       },triggersEnter:[function (context,redirect) {
            if(Meteor.user() === null)
                redirect('/')
        }],triggersExit:[function (context,redirect) {
        if(Meteor.user() === null)
            redirect('/')
    }]
});

  FlowRouter.route('/',{
      name: 'login',
      waitOn(){
          return [import('../imports/backend/login/client/login.html')];
      },
      action(){
          this.render('loginLayout','LOGIN');
      },
          triggersExit: [function (context, redirect) {
          if(Meteor.user()!== null){
              redirect('/dashboard');
          }
      }]
  });
 FlowRouter.route('/employee',{
      name: 'addEmployee',
      waitOn(){
          return [import('../imports/backend/employees/client/employees.html'),import('../imports/ui/mainui.html')];
      },
      action(){
          this.render('layout','addEmployee');
      },triggersEnter:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }],triggersExit:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }]
 });

 FlowRouter.route('/employees',{
     name: 'viewEmployees',
     waitOn(params,queryParams,ready){
         return [import('../imports/backend/employees/client/employees.html'),import('../imports/ui/mainui.html'),Meteor.subscribe('employees')];
     },
     action() {
         this.render('layout', 'viewEmployees');
     },triggersEnter:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }],triggersExit:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }],
 });

 FlowRouter.route('/employee/:id',{
     name: 'edit',
     action(params,queryParams, employee){
         this.render('layout','editEmployee',{employee: employee});
     },
     waitOn(){
         return [import('../imports/backend/employees/client/employees.html'),import('../imports/ui/mainui.html'),Meteor.subscribe('employees')];
     },
     data(params,queryParams){
         return Employees.findOne({_id: params.id});
     },triggersEnter:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }],triggersExit:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }]
 });

 FlowRouter.route('/company/:id',{
    name:'editCompany',
     action(params,queryParams,company){
        this.render('layout','editCompany',{company: company})
     },
     waitOn(){
         return [import('../imports/backend/companies/client/companies.html'),import('../imports/ui/mainui.html'),Meteor.subscribe('companies')];
     },
     data(params,queryParams){
         return Companies.findOne({_id: params.id});
     },triggersEnter:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }],triggersExit:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }]
 });

 FlowRouter.route('/company',{
    name: 'addCompany',
     waitOn(){
        return [import('../imports/backend/companies/client/companies.html'),import('../imports/ui/mainui.html')];
     },
     action(){
         this.render('layout','addCompany');
     },triggersEnter:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }],triggersExit:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }]
 });

 FlowRouter.route('/companies',{
     name: 'viewCompanies',
     waitOn(){
         return [import('../imports/backend/companies/client/companies.html'),import('../imports/ui/mainui.html'),Meteor.subscribe('companies')];
     },
     action() {
         this.render('layout', 'viewCompanies');
     },triggersEnter:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }],triggersExit:[function (context,redirect) {
         if(Meteor.user() === null)
             redirect('/')
     }]
 });

FlowRouter.route('/contact',{
    name: 'addContact',
    waitOn(){
        return [import('../imports/backend/contacts/client/contacts.html'),import('../imports/ui/mainui.html'),Meteor.subscribe('companies')];
    },
    action(){
        this.render('layout','addContact');
    },triggersEnter:[function (context,redirect) {
        if(Meteor.user() === null)
            redirect('/')
    }],triggersExit:[function (context,redirect) {
        if(Meteor.user() === null)
            redirect('/')
    }]
});

FlowRouter.route('/contact/:id',{
    name:'editContact',
    action(params,queryParams,contact){
        this.render('layout','editContact',{contact: contact})
    },
    waitOn(){
        return [import('../imports/backend/contacts/client/contacts.html'),import('../imports/ui/mainui.html'),Meteor.subscribe('contacts')];
    },
    data(params,queryParams){
        return Contacts.findOne({_id: params.id});
    },triggersEnter:[function (context,redirect) {
        if(Meteor.user() === null)
            redirect('/')
    }],triggersExit:[function (context,redirect) {
        if(Meteor.user() === null)
            redirect('/')
    }]

});

FlowRouter.route('/contacts',{
    name: 'viewContacts',
    waitOn(){
        return [import('../imports/backend/contacts/client/contacts.html'),import('../imports/ui/mainui.html'),Meteor.subscribe('contacts')];
    },
    action() {
        this.render('layout', 'viewContacts');
    },triggersEnter:[function (context,redirect) {
        if(Meteor.user() === null)
            redirect('/')
    }],triggersExit:[function (context,redirect) {
        if(Meteor.user() === null)
            redirect('/')
    }]
});