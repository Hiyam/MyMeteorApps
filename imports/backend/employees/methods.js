import {Meteor} from 'meteor/meteor';
import {Employees} from '../../api/collections.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
Meteor.methods({
    'employee.disable'(employee_id){
        Employees.update({user_id: employee_id}, {$set: {status: 'disabled'}});
        let role = Employees.findOne({user_id: employee_id}).role;
        if(!this.isSimulation) {
            import {ChangeCurrentUserStatus} from '../../../server/main.js';
            ChangeCurrentUserStatus(employee_id, role, 'disabled');

            import {currentUserIsDisabeled} from '../../../server/main.js';

            if (currentUserIsDisabeled(this.userId)) {
                 import {LogOutCurrentUser} from '../../../server/main.js';
                 LogOutCurrentUser(this.user_id);
                 return true;
            }
        }
        return false;
    },

    'employee.enable'(employee_id){
        Employees.update({user_id: employee_id}, {$set: {status: 'enabled'}});
        let role = Employees.findOne({user_id: employee_id}).role;

            if(!this.isSimulation) {
                import {ChangeCurrentUserStatus} from '../../../server/main.js';
                ChangeCurrentUserStatus(employee_id, role, 'enabled');
            }
    },
});
