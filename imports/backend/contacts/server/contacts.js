import '../../../api/contacts.js';
import {Contacts} from '../../../api/collections.js';
import {Companies} from '../../../api/collections.js';

Meteor.publish('contacts', function listofcontacts() {
        if(this.userId) {
            return Contacts.find({});
        }
});
Meteor.publish('companies',function listofcompanies() {
    if(this.userId){
        return Companies.find({});
    }
});