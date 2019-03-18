import { APIService } from './Controllers/API.service';
import { CatPhoto } from './Models/CatPhoto';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { LoadingSpinner1Component } from './Components/loading-spinner1/loading-spinner1.component';
import { FlexGridComponent } from './Components/flex-grid/flex-grid.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NewPatientComponent } from './Components/new-patient/new-patient.component';
import { LoadingSpinner2Component } from './Components/loading-spinner2/loading-spinner2.component';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Patient } from './Models/Patient';
import { SearchCriteria } from './Models/SearchCriteria';
import { Observable, asyncScheduler, of } from 'rxjs';
import { PatientService } from './Controllers/patient.service';
import { RandomProfile } from './Models/RandomProfile';
import { SearchService } from './Services/Search.service';

const customNotifierOptions: NotifierOptions = {
    position: {
          horizontal: {
              position: 'left',
              distance: 12
          },
          vertical: {
              position: 'bottom',
              distance: 12,
              gap: 10
          }
      },
    theme: 'material',
    behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease'
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50
      },
      shift: {
        speed: 300,
        easing: 'ease'
      },
      overlap: 150
    }
  };

const testPatients = {

    get(): Patient[] {
        const patients: Patient[] = [];

        patients.push({
            FirstName: 'Test1',
            LastName: 'Test1',
            Gender: 'Male',
            Age: 18,
            DOB: '1981-07-13',
            Communication: {
                Address: '1524 NW 47 Ave',
                Country: 'USA',
                Email: 'ivanoxq@gmail.com',
                Phone: '3057991785',
                Zip: '33321'
            },
            Image: {
                ImageCodeBase64: 'KWEJIADKJFKSADJF'
            },
            Description: {
                Interest: 'Test1',
                Characteristics: ''
            }
        });

        patients.push({
            FirstName: 'Test2',
            LastName: 'Test2',
            Gender: 'Female',
            Age: 23,
            DOB: '1989-07-25',
            Communication: {
                Address: '1524 NW 47 Ave',
                Country: 'USA',
                Email: 'ivanoxq@gmail.com',
                Phone: '3057991785',
                Zip: '33321'
            },
            Image: {
                ImageCodeBase64: 'KWEJIADKJFKSADJF'
            },
            Description: {
                Interest: 'Test2',
                Characteristics: ''
            }
        });

        patients.push({
            FirstName: 'Test3',
            LastName: 'Test3',
            Gender: 'Female',
            Age: 23,
            DOB: '1989-07-25',
            Communication: {
                Address: '1524 NW 47 Ave',
                Country: 'USA',
                Email: 'ivanoxq@gmail.com',
                Phone: '3057991785',
                Zip: '33321'
            },
            Image: {
                ImageCodeBase64: 'KWEJIADKJFKSADJF'
            },
            Description: {
                Interest: 'Test3',
                Characteristics: ''
            }
        });

        return patients;
    }
}

const searchServiceStub = {
    Patients : [],
    SetPatients(patients: Patient[]) {
        searchServiceStub.Patients = [];
        patients.forEach(x => {
            searchServiceStub.Patients.push(x);
        });
    },
    GetPatients() {

        return of(searchServiceStub.Patients, asyncScheduler);
    }
}

const patientServiceStub = {

    InsertPatient (patient: Patient) {
        return of("Success", asyncScheduler);
    },

    SearchPatients (search: SearchCriteria): Observable<Patient[]> {
        return of(testPatients.get(), asyncScheduler);
    }
}

const apiServiceStub = {
    GetRandomCatImage(imageUrl: string): Observable<Object>  {
        return of('c2FmYXNkZmFkc2Zhc2RmYXNkZg==', asyncScheduler);
    },

    GetRandomCatInfo(): Observable<Object> {
        const cat: CatPhoto[] = [{
            breeds: [],
            id: '4ia',
            url: 'https://cdn2.thecatapi.com/images/4ia.gif'
        }]

        return of(cat, asyncScheduler);
    },

    GetRandomProfile(): Observable<Object> {
        const profile: RandomProfile = {
            profile: {
                userID: '5c8ef72c6eee6',
                firstName: 'Faolán',
                surname: 'Scibelli',
                translitFirstName: 'Faolán',
                translitSurname: 'Scibelli',
                gender: 'Male',
                birthday: '1953-10-08',
                age: 65,
                country: 'United Kingdom',
                iso: 'GBR',
                passportNumber: '799867188',
                ssNumber: 'WJ422983A',
                phone: '+4428 7415 7087',
                address: '1163 Vernon Crescent, Ravenshead',
                translitAddress: '1163 Vernon Crescent, Ravenshead',
                zipCode: 'NG15 9BL',
                email: 'Faol_n.Scibelli@ex6ample.com',
                username: 'wallaby_Faolán523',
                password: 'fjmpJqpVR',
                registeredDate: '2018-12-17',
                occupation: 'Waiters and Waitresses'
            }
        }

        return of(profile, asyncScheduler);
    }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, SearchBoxComponent, FlexGridComponent, NewPatientComponent, LoadingSpinner1Component
        , LoadingSpinner2Component ],
      imports: [MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule
        , MatInputModule, MatExpansionModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule
        , [ModalModule.forRoot()], NotifierModule.withConfig(customNotifierOptions)],
        providers: [{provide: PatientService, useValue: patientServiceStub},
                    {provide: APIService, useValue: apiServiceStub},
                    {provide: SearchService, useValue: searchServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should start search and show grid spinner', async(() => {
    fixture.detectChanges();

    expect(component.showGridSpinner).toBeFalsy();

    component.searchStarted(true);

    fixture.detectChanges();

    expect(component.showGridSpinner).toBeTruthy();
  }))

  it('should search for patient', async(() =>{

    fixture.detectChanges();

    component.SearchPatient('a');

    fixture.whenStable().then(() => {

        searchServiceStub.GetPatients().subscribe((x:Patient[]) => {
            
            let countFound = 0;

            x.forEach(p => {
                testPatients.get().forEach(y => {
                    if (p.FirstName === y.FirstName && p.LastName === y.LastName
                        && p.Age === y.Age && p.Gender === y.Gender && p.DOB === y.DOB) {
                        countFound++;
                    }
                });
            });

            expect(countFound).toEqual(x.length);
        });
    });

  }));

  it('should hide grid spinner end of search', async(() => {

    fixture.detectChanges();

    component.showGridSpinner = true;

    fixture.detectChanges();

    component.GridSpinnerChange(false);

    fixture.detectChanges();

    expect(component.showGridSpinner).toBeFalsy();
  }))

  it('should add new patient', async(() => {
    fixture.detectChanges();

    component.AddPatient();

    fixture.detectChanges();

    component.onSubmit(testPatients.get()[0]);

    fixture.whenStable().then(() => {

        setTimeout( () => {
            const btn = <HTMLElement>document.querySelector('button.btn-default');

            btn.dispatchEvent(new Event('click'));

            expect(component.showGridSpinner).toBeTruthy();
            expect(component.showInputSpinner).toBeFalsy();
          }, 200);
    });
  }));

  it('should add Random Patient', fakeAsync(() => {
    fixture.detectChanges();

    component.AddRandomPatient(false);

    fixture.detectChanges();

    tick();

    expect(component.showGridSpinner).toBeTruthy();
    expect(component.showInputSpinner).toBeFalsy();

    
  }));
});
