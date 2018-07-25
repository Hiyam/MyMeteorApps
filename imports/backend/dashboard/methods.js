import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

Meteor.methods({
    'dashboard.getNumOfCompanies'(){
        if(!this.isSimulation) {
            import {getCompanies} from '../../../server/main.js';
            return getCompanies();
        }
    },
    'dashboard.getNumOfContacts'(){
        if(!this.isSimulation) {
            import {getContacts} from '../../../server/main.js';
            return getContacts();
        }
    },
    'dashboard.getNumOfEmployees'(){
        if(!this.isSimulation) {
            import {getEmployees} from '../../../server/main.js';
            return getEmployees();
        }
    },
    'currUserIsAdmin'(){
        if(!this.isSimulation) {
            import {currentUserIsAdmin} from '../../../server/main.js';
            return currentUserIsAdmin(Meteor.userId());
        }
    }
});
