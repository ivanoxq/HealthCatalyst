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
import { NotifierService } from 'angular-notifier';
import { ErrorService } from './Services/Error.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(modalService, patientService, searchService, apiService, notifierService, errorService) {
        var _this = this;
        this.modalService = modalService;
        this.patientService = patientService;
        this.searchService = searchService;
        this.apiService = apiService;
        this.notifierService = notifierService;
        this.errorService = errorService;
        this.showGridSpinner = false;
        this.showInputSpinner = false;
        this.GridSpinnerChange = function (value) {
            _this.showGridSpinner = value;
        };
        this.AddPatient = function () {
            _this.modalRef = _this.modalService.show(_this.addPatientTemplate, { ignoreBackdropClick: true });
        };
        this.AddRandomPatient = function (badCall) {
            _this.showInputSpinner = true;
            _this.apiService.GetRandomProfile().subscribe(function (x) {
                _this.apiService.GetRandomCatInfo().subscribe(function (y) {
                    var profile = x;
                    _this.SubmitRandomPatient(profile, y[0], badCall);
                }, function (error) {
                    _this.errorService.Error("Issue Calling Cats API:\n" + error.message);
                });
            }, function (error) {
                _this.errorService.Error("Issue Calling Random Profile API:\n" + error.message);
            });
        };
        this.SearchPatient = function (pattern) {
            _this.searchService.CurrentPattern = pattern;
            _this.patientService.SearchPatients({
                SearchPattern: pattern
            }).subscribe(function (result) {
                _this.searchService.SetPatients(result);
            }, function (error) {
                _this.errorService.Error("Issue Calling Search Patient API:\n" + error.message);
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
        this.searchStarted = function (event) {
            _this.showGridSpinner = event;
        };
        this.notifier = this.notifierService;
        this.errorService.error.subscribe(function (error) {
            _this.notifier.notify('error', error);
        });
    }
    AppComponent.prototype.SubmitRandomPatient = function (profile, cat, badCall) {
        var _this = this;
        this.showInputSpinner = true;
        var genProfile = profile.profile;
        var patient = {
            FirstName: badCall ? '' : genProfile.firstName,
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
        this.toDataUrl(cat.url, function (myBase64) {
            patient.Image.ImageCodeBase64 = myBase64;
            _this.insertPatient(patient);
        });
    };
    AppComponent.prototype.insertPatient = function (patient) {
        var _this = this;
        this.patientService.InsertPatient(patient).subscribe(function (p) {
            console.log(p);
            _this.searchStarted(true);
            _this.SearchPatient(_this.searchService.CurrentPattern);
            _this.showInputSpinner = false;
            _this.notifier.notify('success', "Patient " + patient.FirstName + " " + patient.LastName + " was added.");
        }, function (error) {
            _this.showInputSpinner = false;
            _this.errorService.error.next("Issue Calling Insert Patient API:\n" + error.message);
        });
    };
    AppComponent.prototype.toDataUrl = function (url, callback) {
        var file = this.apiService.GetRandomCatImage(url).subscribe(function (x) { return callback(x); });
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
            APIService,
            NotifierService,
            ErrorService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map