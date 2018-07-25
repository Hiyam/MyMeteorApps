import {Meteor} from 'meteor/meteor';
import {Contacts} from '../../api/collections.js';
import {Companies} from '../../api/collections.js';

Meteor.methods({
    'contacts.delete'(contact_id){
        Companies.update({},{$pull: {contacts: {contactID: contact_id}}});
        Contacts.remove({_id: contact_id});
    }
});