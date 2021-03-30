import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LookupService } from './lookup.service';
import { lookupBasePath } from 'src/environments/environment';
import { statusCodeArray, statusTypeArray } from '../model/const';
import { of } from 'rxjs';

describe('Test LookupService API call..', () => {
  let service: LookupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LookupService],
    });
    service = TestBed.inject(LookupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });

  // Fetch all status codes..
  /*it('fetchStatusCodes() should GET and return all status codes', () => {
    let serviceSpy = spyOnProperty(service.statusTypes$, 'value', 'get').and.returnValue(of(statusCodeArray)).and.callThrough();
    //let serviceSpy = spyOn(service, 'fetchStatusCodes').and.returnValue(of(statusCodeArray)).and.callThrough();
    service.fetchStatusCodes().subscribe((resp: any) => {
      expect(resp.length).toBe(3);
      expect(resp[0].status).toEqual('Active');
      expect(serviceSpy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + lookupBasePath + '/statusCodes');
    expect(req.request.method).toBe('GET');
  });

  // Fetch all status types..
  it('fetchStatusTypes() should GET and return all status types', () => {
    let serviceSpy = spyOn(service, 'fetchStatusTypes').and.returnValue(of(statusTypeArray)).and.callThrough();
    service.fetchStatusTypes().subscribe((resp: any) => {
      expect(resp.length).toBe(7);
      expect(resp[5].name).toEqual('Involuntary termination');
      expect(serviceSpy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + lookupBasePath + '/statusTypes');
    expect(req.request.method).toBe('GET');
  });*/
});
