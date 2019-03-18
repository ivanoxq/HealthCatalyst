/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { LoadingSpinner1Component } from './loading-spinner1.component';
describe('LoadingSpinner1Component', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LoadingSpinner1Component]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LoadingSpinner1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=loading-spinner1.component.spec.js.map