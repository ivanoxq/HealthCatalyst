var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './Controllers/patient.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
import { FlexGridComponent } from './Components/flex-grid/flex-grid.component';
import { NewPatientComponent } from './Components/new-patient/new-patient.component';
import { APIService } from './Controllers/API.service';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, FlexLayoutModule, [ModalModule.forRoot()]],
            declarations: [AppComponent, SearchBoxComponent, FlexGridComponent, NewPatientComponent],
            providers: [PatientService, APIService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map