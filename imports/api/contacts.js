import {Contacts} from './collections.js';
import {Companies} from './collections.js';
ContactSchema = new SimpleSchema({
    id: {
      type: String,
        optional: true
    },
    firstName:{
        type: String,
        min:2
    },
    lastName:{
        type: String,
        min:2
    },
    email:{
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    company:{
        type: String,
        min:2
    },
    phone:{
        type: String,
        min: 8
    }
});

export const checkContact = new ValidatedMethod({
    name: 'Contact.check',
    validate: ContactSchema.validator(),
    run(ContactObj){
        if(ContactObj.id !== undefined) {
            Contacts.update({_id: ContactObj.id}, {
                $set: {
                    firstName: ContactObj.firstName,
                    lastName:ContactObj.lastName,
                    email: ContactObj.email,
                    company: ContactObj.company,
                    phone:ContactObj.phone
                }
            });
        }else {
            let contact_id = Contacts.insert({
                firstName: ContactObj.firstName,
                lastName: ContactObj.lastName,
                email: ContactObj.email,
                company: ContactObj.company,
                phone: ContactObj.phone,
                createdAt: new Date(),
                createdBy: Meteor.userId()
            });
            Companies.update({_id: ContactObj.company},{$push: {contacts: {"contactID": contact_id }}});
        }
    }
});