/**
 * Created by hiyam on 08/08/17.
 */
import '../../../api/companies.js';
import {Companies} from '../../../api/collections.js';
    Meteor.publish('companies',function listofcompanies() {
        if(this.userId)
            return Companies.find({});
});

