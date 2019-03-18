/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewPatientComponent } from './new-patient.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
describe('NewPatientComponent', function () {
    var component;
    var fixture;
    var de;
    var el;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [NewPatientComponent],
            imports: [ReactiveFormsModule, FormsModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NewPatientComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should not call the submit method if form is invalid.', async(function () {
        component.ngOnInit();
        fixture.detectChanges();
        spyOn(component, 'submit');
        var form = fixture.debugElement.query(By.css('form'));
        if (component.newPatientform.valid) {
            form.triggerEventHandler('submit', null);
        }
        expect(component.submit).toHaveBeenCalledTimes(0);
    }));
    it('should call the submit method if form is valid.', async(function () {
        component.ngOnInit();
        component.newPatientform.controls['FirstName'].setValue('Ivan');
        component.newPatientform.controls['LastName'].setValue('Olmos');
        component.newPatientform.controls['Age'].setValue(18);
        component.newPatientform.controls['DOB'].setValue('1981-07-13');
        component.newPatientform.controls['Gender'].setValue('Male');
        component.newPatientform.controls['Address'].setValue('7305 NW 64 st');
        component.newPatientform.controls['Zip'].setValue('33321');
        component.newPatientform.controls['Country'].setValue('USA');
        component.newPatientform.controls['Email'].setValue('ivanoxq@gmail.com');
        component.newPatientform.controls['Phone'].setValue('3057991785');
        component.newPatientform.controls['Image'].setValue('test');
        fixture.detectChanges();
        spyOn(component, 'submit');
        var form = fixture.debugElement.query(By.css('form'));
        form.triggerEventHandler('submit', null);
        expect(component.submit).toHaveBeenCalledTimes(1);
    }));
});
//# sourceMappingURL=new-patient.component.spec.js.map