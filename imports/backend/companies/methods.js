/**
 * Created by hiyam on 08/08/17.
 */
import {Meteor} from 'meteor/meteor';
import {Companies} from '../../api/collections.js';

Meteor.methods({
    'companies.delete'(company_id){
        Companies.remove({_id: company_id});
    }
});
