/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { LoadingSpinner2Component } from './loading-spinner2.component';
describe('LoadingSpinner2Component', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LoadingSpinner2Component]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LoadingSpinner2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=loading-spinner2.component.spec.js.map