var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'ClientApp/app/Services/Search.service';
import { DomSanitizer } from '@angular/platform-browser';
var FlexGridComponent = /** @class */ (function () {
    function FlexGridComponent(searchService, _sanitizer) {
        this.searchService = searchService;
        this._sanitizer = _sanitizer;
        this.patientBufferNextIndex = 0;
        this.SpinnerAction = new EventEmitter();
        this.ClickAddButton = new EventEmitter();
        this.GenerateRandom = new EventEmitter();
        this.ShowDataSpinner = false;
        this.ShowInputSpinner = false;
    }
    FlexGridComponent.prototype.onScroll = function () {
        if (this.patientsBuffer && this.bottomReached()) {
            for (var lcv = 0; lcv < 9 && this.patientBufferNextIndex < this.patientsBuffer.length; lcv++) {
                this.patients.push(this.patientsBuffer[this.patientBufferNextIndex++]);
            }
        }
        else if (this.patientsBuffer && this.topReached()) {
            this.patients = [];
            this.patientBufferNextIndex = 0;
            if (this.patientsBuffer) {
                for (var lcv = 0; lcv < 9 && this.patientBufferNextIndex < this.patientsBuffer.length; lcv++) {
                    this.patients.push(this.patientsBuffer[this.patientBufferNextIndex++]);
                }
            }
            else {
                this.patients = this.patientsBuffer;
            }
        }
    };
    FlexGridComponent.prototype.ngOnInit = function () {
        var _this = this;
        var $patients = this.searchService.GetPatients();
        $patients.subscribe(function (p) {
            _this.SpinnerAction.emit(false);
            _this.patientBufferNextIndex = 0;
            _this.patientsBuffer = p;
            _this.patients = [];
            if (_this.patientsBuffer) {
                for (var lcv = 0; lcv < 9 && _this.patientBufferNextIndex < _this.patientsBuffer.length; lcv++) {
                    _this.patients.push(_this.patientsBuffer[_this.patientBufferNextIndex++]);
                }
            }
            else {
                _this.patients = _this.patientsBuffer;
            }
        });
    };
    FlexGridComponent.prototype.ngOnChanges = function (changes) {
    };
    FlexGridComponent.prototype.clickAdd = function () {
        this.ClickAddButton.emit();
    };
    FlexGridComponent.prototype.clickGenerate = function (badCall) {
        this.GenerateRandom.emit(badCall);
    };
    FlexGridComponent.prototype.sanatizeImage = function (base64) {
        return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + base64);
    };
    FlexGridComponent.prototype.bottomReached = function () {
        return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 3;
    };
    FlexGridComponent.prototype.topReached = function () {
        return window.scrollY == 0;
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FlexGridComponent.prototype, "SpinnerAction", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FlexGridComponent.prototype, "ClickAddButton", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FlexGridComponent.prototype, "GenerateRandom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FlexGridComponent.prototype, "ShowDataSpinner", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FlexGridComponent.prototype, "ShowInputSpinner", void 0);
    __decorate([
        HostListener("window:scroll", []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FlexGridComponent.prototype, "onScroll", null);
    FlexGridComponent = __decorate([
        Component({
            selector: 'app-flex-grid',
            templateUrl: './flex-grid.component.html',
            styleUrls: ['./flex-grid.component.css']
        }),
        __metadata("design:paramtypes", [SearchService,
            DomSanitizer])
    ], FlexGridComponent);
    return FlexGridComponent;
}());
export { FlexGridComponent };
//# sourceMappingURL=flex-grid.component.js.map