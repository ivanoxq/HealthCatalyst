var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LoadingSpinner2Component } from './Components/loading-spinner2/loading-spinner2.component';
import { LoadingSpinner1Component } from './Components/loading-spinner1/loading-spinner1.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './Controllers/patient.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalModule } from 'ngx-bootstrap';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { NotifierModule } from 'angular-notifier';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
import { FlexGridComponent } from './Components/flex-grid/flex-grid.component';
import { NewPatientComponent } from './Components/new-patient/new-patient.component';
import { APIService } from './Controllers/API.service';
var customNotifierOptions = {
    position: {
        horizontal: {
            position: 'left',
            distance: 12
        },
        vertical: {
            position: 'bottom',
            distance: 12,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                FlexLayoutModule,
                MatCardModule,
                MatIconModule,
                MatToolbarModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                MatExpansionModule,
                BrowserAnimationsModule,
                [ModalModule.forRoot()],
                NotifierModule.withConfig(customNotifierOptions),
                ScrollDispatchModule
            ],
            declarations: [
                AppComponent,
                SearchBoxComponent,
                FlexGridComponent,
                NewPatientComponent,
                LoadingSpinner1Component,
                LoadingSpinner2Component
            ],
            providers: [
                PatientService,
                APIService
            ],
            bootstrap: [
                AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map