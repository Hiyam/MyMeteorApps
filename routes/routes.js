/**
 * Created by hiyam on 02/08/17.
 */
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/',{
    name: 'home',
    action(){
        console.log("home");
    }
});

FlowRouter.route('/employees',{
    name: 'employees',
    action(){
        console.log('employees');
    }
})

FlowRouter.route('/companies',{
    name: 'companies',
    action(){
        console.log('companies');
    }
});

FlowRouter.route('/contacts',{
    name: 'compnies',
    action(){
        console.log('contacts');
    }
})

