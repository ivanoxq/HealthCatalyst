/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PatientService } from './patient.service';
describe('Service: Patient', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PatientService]
        });
    });
    it('should ...', inject([PatientService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=patient.service.spec.js.map