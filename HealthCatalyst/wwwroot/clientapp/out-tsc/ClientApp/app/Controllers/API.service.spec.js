/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { APIService } from './API.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('Service: API', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [APIService]
        });
    });
    it('should ...', inject([APIService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=API.service.spec.js.map