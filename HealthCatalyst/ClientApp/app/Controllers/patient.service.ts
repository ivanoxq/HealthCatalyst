import { Patient } from './../Models/Patient';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchCriteria } from '../Models/SearchCriteria';


@Injectable() export class PatientService {

  private APIURL = "http://localhost:8841/";

  constructor(private http: HttpClient) { }

  public InsertPatient(patient: Patient): Observable<string> {
    const methodURL = `${this.APIURL}/api/Patient/InsertPatient`;

    const rtn = this.http.post<string>(methodURL, patient, {
        headers: 
        {
            'Content-Type': 'application/json'
        }
    });

    return rtn;
  }

  public SearchPatients(search: SearchCriteria): Observable<Patient[]> {
    const methodURL = `${this.APIURL}/api/Patient/SearchPatients`;

    const rtn = this.http.post<Patient[]>(methodURL, search, {
        headers: 
        {
            'Content-Type': 'application/json'
        }
    });

    return rtn;
  }
}
