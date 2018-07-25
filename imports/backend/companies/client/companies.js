import './companies.html';
import '../../../api/companies.js';
import '../methods.js';
import {Meteor} from 'meteor/meteor';
import {checkCompany} from '../../../api/companies.js';
import {Companies} from '../../../api/collections.js';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
let COMPANY_ID;

Template.editCompany.events({
    'click .edit_company'(){
            let company_id = this.company._id;
            console.log(company_id);
            let company = {
                id: company_id,
                name: document.getElementById('name').value,
                address: document.getElementById('address').value,
                email: document.getElementById('email').value,
                website: document.getElementById('website').value,
                businesstype: document.getElementById('businesstype').value,
            };
        checkCompany.call(company
                 , (err, res) => {
                         if (err) {
                             err.details.forEach((fieldError) =>{
                                 console.log(fieldError.name, fieldError.type, fieldError.reason);
                                 if(fieldError.name === 'name')
                                     document.getElementById('name_error').innerHTML = "company name must be at least 2 characters";
                                 if(fieldError.name === 'address')
                                     document.getElementById('address_error').innerHTML = "company address must be at least 2 characters";
                                 if(fieldError.name === 'email')
                                     document.getElementById('email_error').innerHTML = "email must be of the form: example@example.com";
                             });
                     }else{
                         console.log('clicked');
                             document.getElementById('editCompanyForm').reset();
                             document.getElementById('name_error').innerHTML = "";
                             document.getElementById('address_error').innerHTML = "";
                             document.getElementById('email_error').innerHTML = "";
                         FlowRouter.go('/companies');
                     }
                 });
    }
});
Template.editCompany.helpers({
    getCompanyId(company_id){
       COMPANY_ID = company_id;
    },
    businesstypes(){
       let array = [];
       array.push('service');
        array.push('merchandising');
        array.push('manufacturing');
       return array;
    },
    companyIsInBusinessType(business_type){
        if (Companies.findOne({_id: COMPANY_ID}).businessType === business_type)
            return true;
        return false;
    }
});
Template.addCompany.events({
    'click .add_company'(){
        let company = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            businesstype: document.getElementById('businesstype').value
        };
        checkCompany.call(company
            , (err, res) => {
                if (err) {
                    err.details.forEach((fieldError) =>{
                       console.log(fieldError.name, fieldError.type, fieldError.reason);
                       if(fieldError.name === 'name')
                           document.getElementById('name_error').innerHTML = "company name must be at least 2 characters";
                        if(fieldError.name === 'address')
                            document.getElementById('address_error').innerHTML = "company address must be at least 2 characters";
                        if(fieldError.name === 'email')
                            document.getElementById('email_error').innerHTML = "email must be of the form: example@example.com";
                    });
                }else{
                    console.log('clicked');
                    document.getElementById('addCompanyForm').reset();
                    document.getElementById('name_error').innerHTML = "";
                    document.getElementById('address_error').innerHTML = "";
                    document.getElementById('email_error').innerHTML = "";
                    FlowRouter.go('/companies')
                }
            });
    }
});

Template.viewCompanies.helpers({
    companies(){
        return Companies.find({},{$sort: {createdAt: -1}});
    }
});
Template.viewCompanies.events({
   'click .delete'(){
       let self = this;
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
            },
            function(){
                Meteor.call('companies.delete',self._id,(err, result)=>{
                    //swal("Deleted!", "This particular company has been deleted.", "success");
                    if(err){
                        swal(err)
                    }else{
                        swal("Deleted!", "This particular company has been deleted.", "success");
                    }
                });
            });
   }
});
