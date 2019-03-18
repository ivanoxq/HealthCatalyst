/* tslint:disable:no-unused-variable */
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchBoxComponent } from './search-box.component';
describe('SearchBoxComponent', function () {
    var component;
    var fixture;
    var de;
    var el;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SearchBoxComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SearchBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should start the search process', fakeAsync(function () {
        var text = "patient";
        component.showSpinner.subscribe(function (p) {
            expect(p).toBeTruthy();
        });
        component.onSearch.subscribe(function (p) {
            expect(p).toEqual(text);
        });
        fixture.detectChanges();
        console.log(fixture.debugElement);
        var input = fixture.debugElement.query(By.css('input.form-control'));
        console.log(input);
        input.nativeElement.value = 'patient';
        fixture.detectChanges();
        console.log(input);
        input.nativeElement.dispatchEvent(new Event('keyup'));
        tick(4001);
    }));
    it('should resize search box on focus actions', async(function () {
        fixture.detectChanges();
        var input = fixture.debugElement.query(By.css('input.form-control')).nativeElement;
        input.dispatchEvent(new Event('focusin'));
        fixture.detectChanges();
        expect(input.clientWidth).toEqual(298);
        input.dispatchEvent(new Event('focusout'));
        fixture.detectChanges();
        expect(input.clientWidth).toEqual(198);
    }));
});
//# sourceMappingURL=search-box.component.spec.js.map