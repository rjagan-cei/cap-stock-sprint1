import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { memberNamePattern } from 'src/app/shared/model/const';
import { mockedMemberProfile } from 'src/app/shared/model/member';
import { AngularMaterialModule } from 'src/app/shared/module/material/material.module';
import { routes } from '../../members-routing.module';
import { MemberService } from '../../service/member.service';

import { CreateMemberProfileComponent } from './create-member-profile.component';

describe('Create Member Profile - child/presentation component', () => {
  let service: MemberService;
  let component: CreateMemberProfileComponent;
  let fixture: ComponentFixture<CreateMemberProfileComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let mockRouter;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [CreateMemberProfileComponent],
      providers: [{ provide: Router, useValue: mockRouter }, { provide: FormBuilder, useValue: formBuilder }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemberProfileComponent);
    component = fixture.componentInstance;
    component.memberForm = formBuilder.group({
      memberNumber: [''],
      memberName: ['', [Validators.required, Validators.pattern(memberNamePattern)]],
      statusCode: ['', [Validators.required]],
      statusType: ['', [Validators.required]],
      initialStockPurchaseRequired: [''],
      capitalStockAsset: ['', [Validators.required]],
      capitalStockAssetDate: ['', [Validators.required]],
      pendingStockAsset: [''],
      pendingStockAssetDate: ['', [Validators.required]],
      memberStockAssetDate: [''],
      memberDdaAccount: [''],
      mrcs: [''],
      mrcsInputDate: [''],
      mrcsRedemptionDate: [''],
      memberStockMaxRequirement: ['']
    })

    service = TestBed.inject(MemberService);
    fixture.detectChanges();

    const controls = component.memberForm.controls;
    for (const control in controls) {
      controls[control].clearValidators();
      controls[control].updateValueAndValidity({ onlySelf: true });
      component.memberForm.updateValueAndValidity();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.memberForm instanceof FormGroup).toBe(true);
  });

  it('should navigate to `Dashboard` route, if member creation is successful', async () => {
    spyOn(service, 'createMember').and.returnValue(of(mockedMemberProfile))
    component.submitMemberForm(component.memberForm);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(service.createMember).toHaveBeenCalled();
  });

  it('assume service call to API throws Error while creating a member', async () => {
    spyOn(service, 'createMember').and.returnValue(throwError('API Error'));
    component.submitMemberForm(component.memberForm);
    expect(service.createMember).toHaveBeenCalled();
    expect(component.errorMessage).toBe('API Error');
  });

});
