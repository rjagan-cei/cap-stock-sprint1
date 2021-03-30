import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { mockedMemberProfile } from 'src/app/shared/model/member';
import { memberBasePath } from 'src/environments/environment';
import { MemberService } from './member.service';
import { Lookup } from 'src/app/shared/model/lookup';

describe('Test MemberService API call..', () => {
    let service: MemberService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MemberService],
        });

        service = TestBed.get(MemberService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
        expect(httpMock).toBeTruthy();
    });

    // Create member profile..
    it('createMember() should POST and return data', () => {
        let serviceSpy = spyOn(service, 'createMember').and.returnValue(of(mockedMemberProfile)).and.callThrough();
        service.createMember({
            id: null,
            active: true,
            memberNumber: 1001,
            memberName: 'testMember',
            statusCode: new Lookup("1", "Active"),
            statusType: new Lookup("1", "Charter termination"),
            initialStockPurchaseRequired: 1234567.00,
            capitalStockAsset: new Date(2021, 3, 15),
            capitalStockAssetDate: new Date(2021, 3, 25),
            pendingStockAsset: 2345678.00,
            pendingStockAssetDate: new Date(2021, 2, 20),
            memberStockAssetDate: new Date(2021, 1, 10),
            memberDdaAccount: 123456789,
            mrcs: true,
            mrcsInputDate: new Date(2021, 4, 1),
            mrcsRedemptionDate: new Date(2021, 5, 30),
            memberStockMaxRequirement: true
        }).subscribe((resp: any) => {
            expect(resp).toEqual(mockedMemberProfile);
            expect(resp[0].id).toEqual(1);
            expect(serviceSpy).toHaveBeenCalled();
        });

        const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + memberBasePath);
        expect(req.request.method).toBe('POST');
        req.flush(mockedMemberProfile);
    });


    // Get member by id..
    it('getMemberByMemberNumber() should GET and return data', () => {
        let spy = spyOn(service, 'getMemberById').and.returnValue(of(mockedMemberProfile)).and.callThrough();
        service.getMemberById('1').subscribe((resp: any) => {
            expect(resp.length).toBe(1);
            expect(resp).toEqual(mockedMemberProfile);
            expect(spy).toHaveBeenCalled();
        });

        const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + memberBasePath + '/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockedMemberProfile);
    });

    afterEach(() => {
        httpMock.verify();
    });

});