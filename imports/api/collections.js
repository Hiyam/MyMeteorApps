import { Mongo } from 'meteor/mongo';

export const Companies = new Mongo.Collection('companies');
export const Employees = new Mongo.Collection('employees');
export const Contacts = new Mongo.Collection('contacts');

