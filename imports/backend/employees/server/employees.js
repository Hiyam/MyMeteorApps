import '../../../api/employees.js';
import {Employees} from '../../../api/collections.js';
import {currentUserIsAdmin} from '../../../../server/main.js'
    Meteor.publish('employees', function listofemployees() {
        if(this.userId && currentUserIsAdmin(this.userId)) {
            return Employees.find({}, {
                fields: {
                    user_id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phone: 1,
                    status: 1,
                }
            });
        }
    });






