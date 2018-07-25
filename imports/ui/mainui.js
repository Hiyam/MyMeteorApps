import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './mainui.html';

Template.layout.events({
    'click .logout'(){
     Meteor.logout((err) => {
         if(err){
             console.log("Error logging out");
         }else{
             console.log("Logged out successfully");
             FlowRouter.go('/');
         }
     })
    }
});


Template.layout.helpers({
    isAdmin(){
        if (Roles.userIsInRole(Meteor.userId(), 'admin'))
            return true;
        return false;
    },
    logout(){
      Meteor.logout();
      FlowRouter.go('/');
    },
    curr(){
        if(Meteor.user())
            console.log(Meteor.userId());
        else
            console.log("NOO");
    }
});