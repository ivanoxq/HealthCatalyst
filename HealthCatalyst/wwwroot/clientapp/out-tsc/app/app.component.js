var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { APIService } from './Controllers/API.service';
import { PatientService } from './Controllers/patient.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { SearchService } from './Services/Search.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(modalService, patientService, searchService, apiService) {
        var _this = this;
        this.modalService = modalService;
        this.patientService = patientService;
        this.searchService = searchService;
        this.apiService = apiService;
        this.AddPatient = function () {
            _this.modalRef = _this.modalService.show(_this.addPatientTemplate, { ignoreBackdropClick: true });
        };
        this.AddRandomPatient = function () {
            _this.apiService.GetRandomProfile().subscribe(function (x) {
                _this.apiService.GetRandomCatInfo().subscribe(function (y) {
                    var profile = x;
                    console.log(y);
                    _this.SubmitRandomPatient(profile, y[0]);
                });
            });
        };
        this.SearchPatient = function (pattern) {
            _this.patientService.SearchPatients({
                SearchPattern: pattern
            }).subscribe(function (result) {
                _this.searchService.PatientResults.next(result);
            });
        };
        this.onSubmit = function (patient) {
            if (patient) {
                _this.insertPatient(patient);
            }
            if (_this.modalRef) {
                _this.modalRef.hide();
            }
        };
        this.onCancel = function (event) {
            if (_this.modalRef) {
                _this.modalRef.hide();
            }
        };
    }
    AppComponent.prototype.SubmitRandomPatient = function (profile, cat) {
        var _this = this;
        var genProfile = profile.profile;
        var patient = {
            FirstName: genProfile.firstName,
            LastName: genProfile.surname,
            Age: genProfile.age,
            DOB: genProfile.birthday,
            Gender: genProfile.gender,
            Communication: {
                Address: genProfile.address,
                Country: genProfile.country,
                Email: genProfile.email,
                Phone: genProfile.phone,
                Zip: genProfile.zipCode
            },
            Description: {
                Interest: genProfile.occupation,
                Characteristics: "SSN: " + genProfile.ssNumber + ", Passport: " + genProfile.passportNumber
            },
            Image: {
                ImageCodeBase64: ''
            }
        };
        console.log('Cat Url: ', cat.url);
        this.toDataUrl(cat.url, function (myBase64) {
            console.log(myBase64);
            patient.Image.ImageCodeBase64 = myBase64;
            _this.insertPatient(patient);
        });
    };
    AppComponent.prototype.insertPatient = function (patient) {
        this.patientService.InsertPatient(patient).subscribe(function (p) {
            alert("Patient " + patient.FirstName + " " + patient.LastName + " was added.");
        });
    };
    AppComponent.prototype.toDataUrl = function (url, callback) {
        var file = this.apiService.GetRandomCatImage(url).subscribe(function (x) { return callback(x); });
        // var xhr = new XMLHttpRequest();
        // xhr.onload = function() {
        //     var reader = new FileReader();
        //     reader.onloadend = function() {
        //         callback(btoa(reader.result.toString()));
        //     }
        //     reader.readAsDataURL(xhr.response);
        // };
        // xhr.open('GET', url);
        // xhr.responseType = 'blob';
        // xhr.send();
    };
    __decorate([
        ViewChild('template'),
        __metadata("design:type", TemplateRef)
    ], AppComponent.prototype, "addPatientTemplate", void 0);
    AppComponent = __decorate([
        Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [BsModalService,
            PatientService,
            SearchService,
            APIService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map