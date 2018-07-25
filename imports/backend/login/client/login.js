import { Meteor } from 'meteor/meteor';
import './login.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../methods.js';

Template.LOGIN.events({
    'click .login'(event){
        event.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
         Meteor.call('login.checkIfEnabled',username,password,(err,result) =>{
             if(err){
                 console.log(err);
             }else {
                 if(result === true){
                     Meteor.loginWithPassword(username, password, (err) => {
                         if (err) {
                             swal("Oops","Unable to log in,please check your username and password");
                             console.log(err);
                         } else {
                             console.log('Logged in successfully');
                             document.getElementById('loginForm').reset();
                             FlowRouter.go('/dashboard');
                         }
                     });
                 }else{
                     swal("Oops", "You are disabled from logging in");
                 }
             }
         });
    }
});