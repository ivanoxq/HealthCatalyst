import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Patient } from '../Models/Patient';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

constructor() { }

  public CurrentPattern = '';
  private PatientResults = new Subject<Patient[]>();

  public GetPatients(): Observable<Patient[]> {
    return this.PatientResults.asObservable(); 
  }

  public SetPatients(patients: Patient[]) {
    this.PatientResults.next(patients);
  }
}
