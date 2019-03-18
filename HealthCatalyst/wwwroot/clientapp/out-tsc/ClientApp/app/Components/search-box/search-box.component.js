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
import { timer } from 'rxjs';
var SearchBoxComponent = /** @class */ (function () {
    function SearchBoxComponent() {
        this.onSearch = new EventEmitter();
        this.showSpinner = new EventEmitter();
        this.timerStarted = false;
        this.boxSize = "200";
    }
    SearchBoxComponent.prototype.ngOnInit = function () {
    };
    SearchBoxComponent.prototype.onKey = function (event) {
        if (!this.timerStarted) {
            this.timerStarted = true;
            console.log('emitting...');
            this.showSpinner.emit(true);
            this.oberserableTimer(event);
        }
    };
    SearchBoxComponent.prototype.onfocus = function (event) {
        this.boxSize = "300";
    };
    SearchBoxComponent.prototype.onfocusout = function (event) {
        this.boxSize = "200";
    };
    SearchBoxComponent.prototype.oberserableTimer = function (event) {
        var _this = this;
        var source = timer(4000);
        source.subscribe(function (val) {
            _this.timerStarted = false;
            console.log('Fire Timer');
            _this.onSearch.emit(event.target.value);
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SearchBoxComponent.prototype, "onSearch", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SearchBoxComponent.prototype, "showSpinner", void 0);
    SearchBoxComponent = __decorate([
        Component({
            selector: 'app-search-box',
            templateUrl: './search-box.component.html',
            styleUrls: ['./search-box.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], SearchBoxComponent);
    return SearchBoxComponent;
}());
export { SearchBoxComponent };
//# sourceMappingURL=search-box.component.js.map