var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
var NewPatientComponent = /** @class */ (function () {
    function NewPatientComponent(fb) {
        var _this = this;
        this.fb = fb;
        this.onsubmit = new EventEmitter();
        this.oncancel = new EventEmitter();
        this.processFile = function ($event) {
            var reader = new FileReader();
            reader.readAsBinaryString($event.target.files[0]);
            reader.onload = function (e) {
                _this.capturedImage = btoa(reader.result.toString());
            };
        };
    }
    NewPatientComponent.prototype.ngOnInit = function () {
        this.newPatientform = this.fb.group({
            FirstName: ['', [Validators.required, Validators.minLength(1)]],
            LastName: ['', [Validators.required, Validators.minLength(1)]],
            Age: [, [Validators.required, Validators.min(18)]],
            DOB: ['', [Validators.required, Validators.pattern('^(19|20)\\d\\d([- /.])(0[1-9]|1[012])\\2(0[1-9]|[12][0-9]|3[01])$')]],
            Gender: ['', [Validators.required]],
            Address: ['', [Validators.required]],
            Zip: ['', [Validators.required]],
            Country: ['', [Validators.required]],
            Email: ['', [Validators.required, Validators.email]],
            Phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]],
            Interest: [''],
            Characteristics: [''],
            Image: ['']
        });
        this.newPatientform.reset();
    };
    NewPatientComponent.prototype.submit = function (event) {
        if (this.newPatientform.valid) {
            var value = this.newPatientform.value;
            this.onsubmit.emit({
                FirstName: value.FirstName,
                LastName: value.LastName,
                Age: value.Age,
                DOB: value.DOB,
                Gender: value.Gender,
                Communication: {
                    Address: value.Address,
                    Zip: value.Zip,
                    Country: value.Country,
                    Email: value.Email,
                    Phone: value.Phone
                },
                Description: {
                    Characteristics: value.Characteristics,
                    Interest: value.Interest
                },
                Image: {
                    ImageCodeBase64: this.capturedImage
                }
            });
        }
    };
    NewPatientComponent.prototype.cancel = function () {
        this.oncancel.emit();
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NewPatientComponent.prototype, "onsubmit", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NewPatientComponent.prototype, "oncancel", void 0);
    NewPatientComponent = __decorate([
        Component({
            selector: 'app-new-patient',
            templateUrl: './new-patient.component.html',
            styleUrls: ['./new-patient.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder])
    ], NewPatientComponent);
    return NewPatientComponent;
}());
export { NewPatientComponent };
//# sourceMappingURL=new-patient.component.js.map