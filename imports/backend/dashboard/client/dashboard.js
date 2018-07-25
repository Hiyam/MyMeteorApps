import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import '../methods.js';
import './dashboard.html';
Template.dashboard.helpers({
    getNumOfContacts(){
        Meteor.call('dashboard.getNumOfContacts',(err,result)=>{
            if(err)
                console.log(err);
            else {
                console.log(result);
                return result;
            }
        })
    },
    getNumOfCompanies(){
        Meteor.call('dashboard.getNumOfContacts',(err,result)=>{
            if(err)
                console.log(err);
            else {
                console.log(result);
                return result;
            }
        })
    },
    isAdmin(){
        Meteor.call('currUserIsAdmin',(err,result)=>{
            if(err)
                console.log(err);
            else{
                return result;
            }
        })
    }
});