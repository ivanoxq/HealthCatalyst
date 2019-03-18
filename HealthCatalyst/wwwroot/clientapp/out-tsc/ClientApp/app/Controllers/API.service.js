var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var APIService = /** @class */ (function () {
    function APIService(http) {
        this.http = http;
        this.APIURL = "http://localhost:8841/";
    }
    APIService.prototype.GetRandomCatImage = function (imageUrl) {
        var methodUrl = this.APIURL + "/api/API/GetCatUrlImage";
        var url = "\"" + imageUrl + "\"";
        var rtn = this.http.post(methodUrl, url, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'text'
        });
        return rtn;
    };
    APIService.prototype.GetRandomCatInfo = function () {
        var methodUrl = this.APIURL + "/api/API/GetCatPhoto";
        var url = '"https://api.thecatapi.com/v1/images/search/"';
        var rtn = this.http.post(methodUrl, url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return rtn;
    };
    APIService.prototype.GetRandomProfile = function () {
        var methodUrl = this.APIURL + "/api/API/GetRandomProfile";
        var url = '"http://randomprofile.com/api/api.php?format=json&countries=GBR&fromAge=18"';
        var rtn = this.http.post(methodUrl, url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return rtn;
    };
    APIService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], APIService);
    return APIService;
}());
export { APIService };
//# sourceMappingURL=API.service.js.map