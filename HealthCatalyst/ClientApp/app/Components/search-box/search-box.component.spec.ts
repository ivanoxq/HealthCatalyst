/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start the search process', fakeAsync(() => {
    
    let text = "patient";

    component.showSpinner.subscribe((p:boolean)=> {
        expect(p).toBeTruthy();
    })
    
    component.onSearch.subscribe((p:string) => {
        expect(p).toEqual(text);
    });

    fixture.detectChanges();

    console.log(fixture.debugElement );

    const input = fixture.debugElement.query(By.css('input.form-control'));

    console.log(input);

    input.nativeElement.value = 'patient';

    fixture.detectChanges();

    console.log(input);

    (input.nativeElement as HTMLElement).dispatchEvent(new Event('keyup'));

    tick(4001);

  }))

  it('should resize search box on focus actions', async(() => {
    fixture.detectChanges();

    const input: HTMLElement = fixture.debugElement.query(By.css('input.form-control')).nativeElement;

    input.dispatchEvent(new Event('focusin'));

    fixture.detectChanges();

    expect(input.clientWidth).toEqual(298);

    input.dispatchEvent(new Event('focusout'));

    fixture.detectChanges();

    expect(input.clientWidth).toEqual(198);
  }))
});
