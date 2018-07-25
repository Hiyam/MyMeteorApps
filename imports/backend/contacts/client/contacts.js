import './contacts.html';
import '../methods.js';
import '../../companies/methods.js';
import {Template} from 'meteor/templating';
import {checkContact} from '../../../api/contacts.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Contacts} from '../../../api/collections.js';
import {Companies} from '../../../api/collections.js';
import '../../../api/contacts.js';

let CONTACT_ID;
Template.addContact.events({
    'click .add_contact'(){
        let contact = {
            firstName: document.getElementById('fname').value,
            lastName: document.getElementById('lname').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            phone: document.getElementById('phone').value
        };

        checkContact.call(contact
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
                    document.getElementById('addContactForm').reset();
                    document.getElementById('first_name_error').innerHTML = "";
                    document.getElementById('last_name_error').innerHTML = "";
                    document.getElementById('email_error').innerHTML = "";
                    document.getElementById('phone_error').innerHTML = "";
                    FlowRouter.go('/contacts')
                }
            });
    }
});
Template.addContact.helpers({
    companies(){
        return Companies.find({});
    },
    companyID(company_id){
        console.log(company_id);
    }
});
Template.viewContacts.helpers({
    contacts(){
        return Contacts.find({},{$sort: {createdAt: -1}});
    },
    company(contact_id){
        let company_id = Contacts.findOne({_id: contact_id}).company;
        Meteor.subscribe('companies');
        let company_name = Companies.findOne({_id: company_id}).name;
        return company_name;
    }
});
Template.viewContacts.events({
    'click .delete'(){
        let self = this;
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
            },
            function(){
                Meteor.call('contacts.delete',self._id);
                swal("Deleted!", "This particular company has been deleted.", "success");
            });
    },
});
Template.editContact.events({
  'click .edit_contact'(){
      console.log(this.contact._id);
      let id = this.contact._id;
      let updated_contact = {
          id: id,
          firstName: document.getElementById('fname').value,
          lastName: document.getElementById('lname').value,
          email: document.getElementById('email').value,
          company: document.getElementById('company').value,
          phone: document.getElementById('phone').value
      };
      checkContact.call(updated_contact
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

              }else{
                  document.getElementById('first_name_error').innerHTML = "";
                  document.getElementById('last_name_error').innerHTML = "";
                  document.getElementById('email_error').innerHTML = "";
                  document.getElementById('phone_error').innerHTML = "";
                  console.log('clicked');
                  FlowRouter.go('/contacts')
              }
          });
  }
});
Template.editContact.helpers({
    companies(){
        Meteor.subscribe('companies');
        return Companies.find({});
    },
    getContactId(contact_id){
        console.log(contact_id);
        CONTACT_ID = contact_id;
    },
    contactIsInCompany(company_id){
        if(Contacts.findOne({_id: CONTACT_ID}).company === company_id)
            return true;
        return false;
    }
});