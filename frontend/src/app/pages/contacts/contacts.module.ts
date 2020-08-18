import { NgModule } from '@angular/core';
import { ContactMenuComponent } from './contact.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ContactMenuComponent,
  ],
  imports: [
    Ng2SmartTableModule,
  ],
})
export class ContactsModule { }
