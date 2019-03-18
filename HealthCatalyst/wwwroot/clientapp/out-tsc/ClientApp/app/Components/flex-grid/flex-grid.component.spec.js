import { LoadingSpinner2Component } from './../loading-spinner2/loading-spinner2.component';
import { LoadingSpinner1Component } from './../loading-spinner1/loading-spinner1.component';
/* tslint:disable:no-unused-variable */
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { asyncScheduler } from "rxjs";
import { By } from '@angular/platform-browser';
import { FlexGridComponent } from './flex-grid.component';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { of } from 'rxjs';
import { SearchService } from 'ClientApp/app/Services/Search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var searchServiceStub = {
    GetPatients: function () {
        var patients = [];
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
};
describe('FlexGridComponent', function () {
    var component;
    var fixture;
    var de;
    var el;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
                MatInputModule, MatExpansionModule, BrowserAnimationsModule],
            declarations: [FlexGridComponent, LoadingSpinner1Component, LoadingSpinner2Component],
            providers: [{ provide: SearchService, useValue: searchServiceStub }]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FlexGridComponent);
        component = fixture.componentInstance;
        var de;
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should be able to Add Patient', async(function () {
        fixture.detectChanges();
        spyOn(component, 'clickAdd');
        var el = fixture.debugElement.query(By.css('#addPatient')).nativeElement;
        el.click();
        expect(component.clickAdd).toHaveBeenCalled();
    }));
    it('should be able to Generate Patient', async(function () {
        fixture.detectChanges();
        spyOn(component, 'clickGenerate');
        var el = fixture.debugElement.query(By.css('#genPatient')).nativeElement;
        el.click();
        expect(component.clickGenerate).toHaveBeenCalledWith(false);
    }));
    it('should be able to Generate Bad Patient', async(function () {
        fixture.detectChanges();
        spyOn(component, 'clickGenerate');
        var el = fixture.debugElement.query(By.css('#genBadPatient')).nativeElement;
        el.click();
        expect(component.clickGenerate).toHaveBeenCalledWith(true);
    }));
    it('should be able to load Input Spinner', async(function () {
        component.ShowInputSpinner = true;
        fixture.detectChanges();
        el = fixture.debugElement.query(By.css('app-loading-spinner2')).nativeElement;
        expect(el.hidden).toBeFalsy();
    }));
    it('should be able to load Grid Spinner', async(function () {
        component.ShowDataSpinner = true;
        fixture.detectChanges();
        el = fixture.debugElement.query(By.css('app-loading-spinner1')).nativeElement;
        expect(el.hidden).toBeFalsy();
    }));
    it('should be able to load Grid Data', fakeAsync(function () {
        component.ShowDataSpinner = true; //Simulate that a Search has started.
        component.SpinnerAction.asObservable().subscribe(function (p) {
            component.ShowDataSpinner = p;
        });
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        var cards = fixture.debugElement.queryAll(By.css('mat-card'));
        expect(cards.length).toEqual(3);
    }));
});
//# sourceMappingURL=flex-grid.component.spec.js.map