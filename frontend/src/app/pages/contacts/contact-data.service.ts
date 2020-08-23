import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable()
export class ContactDataService {
  constructor(private httpClient: HttpClient) { }

  private api_url = environment.apiUrl;
getContacts(): Observable<any> {
  return this.httpClient.get(`${this.api_url}/contacts/getContact`, { headers: new HttpHeaders({
    Accept : 'application/json',
    ContentType : 'application/json',
  }),
},
);
}

putContact(contactObj, contactId) {
  return this.httpClient.put(this.api_url + `/contacts/putContact/${contactId}`, contactObj,
  {headers: new HttpHeaders({
    Accept : 'application/json',
    ContentType : 'application/json',
  }),
});
}

postContact(postObjContact) {
  return this.httpClient.post(`${this.api_url}/contacts/postContact`, postObjContact ,
  {
    headers: new HttpHeaders({
    Accept : 'application/json',
    ContentType : 'application/json',
    }),
  });
}

deleteContact(deleteContactId) {
  return this.httpClient.delete(`${this.api_url}/contacts/deleteContact/${deleteContactId}`,
  {
    headers: new HttpHeaders({
    Accept : 'application/json',
    ContentType : 'application/json',
    }),
  });
}

}
