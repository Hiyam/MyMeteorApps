import {Employees} from './collections.js';

EmployeeSchema = new SimpleSchema({
    username: {
        type: String,
        min: 2
    },
    password: {
      type: String,
        min: 6
    },
    firstName:{
        type: String,
        min:2
    },
    lastName:{
        type: String,
        min:2
    },
    role: {
        type: String,
    },
    email:{
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    phone:{
        type: String,
        min: 8
    }
});
EditEmployeeSchema = new SimpleSchema({
    id: {
        type: String
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
    phone:{
        type: String,
        min: 8
    }
});
export const checkEmployee = new ValidatedMethod({
    name: 'Employees.add.check',
    validate: EmployeeSchema.validator(),
    run(EmployeeObject){
        const e_id = Employees.insert({
            firstName: EmployeeObject.firstName,
            lastName: EmployeeObject.lastName,
            role: EmployeeObject.role,
            email: EmployeeObject.email,
            phone: EmployeeObject.phone,
            status: "enabled",
            createdAt: new Date(),
            createdBy: Meteor.userId()
        });
        if (!this.isSimulation) {
            console.log('running here');
           let status = Employees.findOne({_id: e_id}).status;
            import {superFunctionAccountCreator} from '../../server/main.js';
            superFunctionAccountCreator(e_id, EmployeeObject.username, EmployeeObject.password,EmployeeObject.role,status);
        }
    }
});

export const editEmployee = new ValidatedMethod({
    name: 'Employees.edit.check',
    validate: EditEmployeeSchema.validator(),
    run(EmployeeObject){
        Employees.update({user_id: EmployeeObject.id},{$set: {
            firstName: EmployeeObject.firstName,
            lastName: EmployeeObject.lastName,
            email: EmployeeObject.email,
            phone: EmployeeObject.phone,
        }});
    }
});