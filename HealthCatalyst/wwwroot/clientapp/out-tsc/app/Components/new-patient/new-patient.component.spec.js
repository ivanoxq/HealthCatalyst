/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { NewPatientComponent } from './new-patient.component';
describe('NewPatientComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [NewPatientComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NewPatientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=new-patient.component.spec.js.map