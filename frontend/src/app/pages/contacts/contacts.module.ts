import { NgModule } from '@angular/core';
import { ContactMenuComponent } from './contact.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContactDataService } from './contact-data.service';
@NgModule({
  declarations: [
    ContactMenuComponent,
  ],
  imports: [
    Ng2SmartTableModule,
  ],
  providers: [ContactDataService],
})
export class ContactsModule { }
