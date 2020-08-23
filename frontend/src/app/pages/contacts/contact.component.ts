
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Contact } from '../../@core/interfaces/iot/phone';
import { ContactDataService } from './contact-data.service';

@Component({
    selector: 'ngx-contact-menu',
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html',
  })
  export class ContactMenuComponent implements OnInit {
    constructor(private contactDataService: ContactDataService) {}
    source: LocalDataSource; // add a property to the component
    coloumns = {user_id: {
      title: 'ID',
      filter: false,
    },
    roll: {
      title: 'User Roll',
      filter: false,
    },
    name: {
      title: 'Name',
      filter: false,
    },
    course: {
      title: 'Course',
      filter: false,
    },
  };

    settings = {
      columns: this.coloumns,
      // actions: {add : false},
      // class: {a.class: 'customFontSize'},
      add: {
        // addButtonContent: 'customFontSize',
        confirmCreate: true,
      },
      // mode: 'inline',
      confirmCreate : true,
      confirmSave : true,
      confirmDelete : true,
    };

    data = [];
ngOnInit(): void {
  this.source = new LocalDataSource(this.data); // create the source
  // call the getAPi for table
  this.getContactsData();
}

getContactsData(): void {
  this.contactDataService.getContacts().subscribe((resContactsData: any) => {
    if (resContactsData) {
      console.log('rescontactData', resContactsData);
    }
  });
}
onSearch(query: string = '') {
  this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'id',
      search: query,
    },
    {
      field: 'name',
      search: query,
    },
    {
      field: 'username',
      search: query,
    },
    {
      field: 'email',
      search: query,
    },
  ], false);
  // second parameter specifying whether to perform 'AND' or 'OR' search
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
}
getCreateData(event): void {
  console.log('event', event);
  // this.source.prepend(this.coloumns);
  this.source.append( { id: 'ID',
  name:  'Full Name',
  username: 'User Name',
  email: 'Email' });
}

// create
createConfirmCall(event): void {
  console.log('event_createConfirmCall', event, event?.newData);
  if ( event?.newData?.user_id && event?.newData?.roll &&  event?.newData?.course && event?.newData?.name) {
  const sendObj = {
    user_id: parseInt(event?.newData?.user_id, 10),
    roll : parseInt(event?.newData?.roll, 10),
    course : event?.newData?.course,
      name: event?.newData?.name,
  };
  this.contactDataService.postContact(sendObj).subscribe((res: any) => {
    if (res) {
      console.log('responseCreated', res);
      if (res.message === 'already exist in db') {
        alert('already exist try with some other user id');
      } else if (res.field === 'created' && res.code === 201) {
        this.source.prepend(event?.newData);
        alert('created');
      }
    } else {
      alert('not created');
    }
  });
  } else {
    alert('please fill details completely');
  }
}

editConfirmCall(event): void {
  console.log('event_editConfirmCall', event);
}
deleteConfirmCall(event): void {
  console.log('event_deleteConfirmCall', event);
}
 }
