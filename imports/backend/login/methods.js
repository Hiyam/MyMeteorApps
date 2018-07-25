/**
 * Created by hiyam on 09/08/17.
 */
import {Meteor} from 'meteor/meteor';


Meteor.methods({
    'login.checkIfEnabled'(username,password){
        if(!this.isSimulation){
            import {checkIfUserIsEnabled} from '../../../server/main.js';
            return checkIfUserIsEnabled(username,password);
        }
    }
});