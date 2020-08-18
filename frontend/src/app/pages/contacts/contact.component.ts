
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'ngx-contact-menu',
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html',
  })
  export class ContactMenuComponent implements OnInit {
    constructor() {}
    source: LocalDataSource; // add a property to the component
    coloumns = {id: {
      title: 'ID',
      filter: false,
    },
    name: {
      title: 'Full Name',
      filter: false,
    },
    username: {
      title: 'User Name',
      filter: false,
    },
    email: {
      title: 'Email',
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

createConfirmCall(event): void {
  console.log('event_createConfirmCall', event);
}
editConfirmCall(event): void {
  console.log('event_editConfirmCall', event);
}
deleteConfirmCall(event): void {
  console.log('event_deleteConfirmCall', event);
}
 }
