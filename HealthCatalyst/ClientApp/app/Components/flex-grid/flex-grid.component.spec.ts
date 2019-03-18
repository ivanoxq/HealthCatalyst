import { LoadingSpinner2Component } from './../loading-spinner2/loading-spinner2.component';
import { LoadingSpinner1Component } from './../loading-spinner1/loading-spinner1.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { asyncScheduler } from "rxjs";
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlexGridComponent } from './flex-grid.component';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { Subject, of } from 'rxjs';
import { Patient } from 'ClientApp/app/Models/Patient';
import { parseTimelineCommand } from '@angular/animations/browser/src/render/shared';
import { SearchService } from 'ClientApp/app/Services/Search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const searchServiceStub = {
    GetPatients() {
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

        return of(patients, asyncScheduler);
    }
}

describe('FlexGridComponent', () => {
  let component: FlexGridComponent;
  let fixture: ComponentFixture<FlexGridComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule
            , MatInputModule, MatExpansionModule, BrowserAnimationsModule],
        declarations: [ FlexGridComponent, LoadingSpinner1Component, LoadingSpinner2Component ],
        providers: [{provide: SearchService, useValue: searchServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexGridComponent);
    component = fixture.componentInstance;
    let de: DebugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to Add Patient', async(() =>{
    fixture.detectChanges();

    spyOn(component, 'clickAdd');

    let el = fixture.debugElement.query(By.css('#addPatient')).nativeElement;
    el.click();
    expect(component.clickAdd).toHaveBeenCalled();

  }));

  it('should be able to Generate Patient', async(() =>{
    fixture.detectChanges();

    spyOn(component, 'clickGenerate');

    let el = fixture.debugElement.query(By.css('#genPatient')).nativeElement;
    el.click();
    expect(component.clickGenerate).toHaveBeenCalledWith(false);

  }));

  it('should be able to Generate Bad Patient', async(() =>{
    fixture.detectChanges();

    spyOn(component, 'clickGenerate');

    let el = fixture.debugElement.query(By.css('#genBadPatient')).nativeElement;
    el.click();
    expect(component.clickGenerate).toHaveBeenCalledWith(true);

  }));

  it('should be able to load Input Spinner', async(() => {
      component.ShowInputSpinner = true;

      fixture.detectChanges();

      el = fixture.debugElement.query(By.css('app-loading-spinner2')).nativeElement;

      expect(el.hidden).toBeFalsy();
  }));

  it('should be able to load Grid Spinner', async(() => {
    component.ShowDataSpinner = true;

    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('app-loading-spinner1')).nativeElement;

    expect(el.hidden).toBeFalsy();
  }));

  it('should be able to load Grid Data', fakeAsync(() => {
    
    component.ShowDataSpinner = true; //Simulate that a Search has started.

    component.SpinnerAction.asObservable().subscribe( p => {
        component.ShowDataSpinner = p;
    })

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('mat-card'));

    expect(cards.length).toEqual(3);

  }));
});
