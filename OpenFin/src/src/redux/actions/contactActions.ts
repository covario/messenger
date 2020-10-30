import { createAction } from 'typesafe-actions';

import { Contact } from '../states/contactState';

const GET_CONTACTS = 'GET_CONTACTS';
const SET_CONTACT = 'SET_CONTACT';
const SET_CONTACTS = 'SET_CONTACTS';

export const getContacts = createAction(GET_CONTACTS)();
export const setContact = createAction(SET_CONTACT)<Contact>();
export const setContacts = createAction(SET_CONTACTS)<Contact[]>();
