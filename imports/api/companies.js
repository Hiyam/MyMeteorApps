/**
 * Created by hiyam on 08/08/17.
 */
import { Mongo } from 'meteor/mongo';
import {Companies} from './collections.js';

Company_Schema = new SimpleSchema({
    id: {
        type: String,
        optional:true
    },
    name: {
        type: String,
        min: 2
    },
    address: {
        type: String,
        min:2
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    website: {
        type: String
    },
    businesstype: {
        type: String
    }
});
// Edit_Company_Schema = new SimpleSchema({
//     name: {
//         type: String,
//         min: 2
//     },
//     address: {
//         type: String
//     },
//     email: {
//         type: String,
//         regEx: SimpleSchema.RegEx.Email
//     },
//     website: {
//         type: String
//     },
//     businesstype: {
//         type: String
//     }
// });
export const checkCompany = new ValidatedMethod({
    name: 'Companies.add.check',
    validate: Company_Schema.validator(),
    run(CompanyObj){
        if(CompanyObj.id === undefined) {
            Companies.insert({
                name: CompanyObj.name,
                address: CompanyObj.address,
                email: CompanyObj.email,
                website: CompanyObj.website,
                businessType: CompanyObj.businesstype,
                contacts: [],
                createdAt: new Date,
                createdBy: Meteor.userId()
            });
        }else{
            Companies.update({_id: CompanyObj.id},{$set: {
                name: CompanyObj.name,
                address: CompanyObj.address,
                email: CompanyObj.email,
                website: CompanyObj.website,
                businessType: CompanyObj.businesstype
            }});
        }
    }
});
// export const checkUpdatedCompany = new ValidatedMethod({
//     name: 'Companies.edit.check',
//     validate: Edit_Company_Schema.validator(),
//     run(CompanyObj){
//         Companies.update({_id: CompanyObj.id},{$set: {
//             name: CompanyObj.name,
//             address: CompanyObj.address,
//             email: CompanyObj.email,
//             website: CompanyObj.website,
//             businessType: CompanyObj.businesstype
//         }});
//     }
// });