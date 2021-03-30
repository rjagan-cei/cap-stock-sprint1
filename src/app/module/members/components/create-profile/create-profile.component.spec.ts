import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { memberNamePattern } from 'src/app/shared/model/const';
import { AngularMaterialModule } from 'src/app/shared/module/material/material.module';
import { routes } from '../../members-routing.module';

import { CreateProfileComponent } from './create-profile.component';

describe('Create Member Profile - parent/smart component', () => {
  let component: CreateProfileComponent;
  let fixture: ComponentFixture<CreateProfileComponent>;
  let dialog: MatDialog;
  const formBuilder: FormBuilder = new FormBuilder();

  class MatDialogMock {
    open() {
      return {
        afterClosed: () => of({ name: '' })
      };
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [CreateProfileComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }, { provide: MatDialog, useClass: MatDialogMock }, { provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
    dialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfileComponent);
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
    });

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

  it('should render title from span tag', () => {
    const title = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(title.innerHTML).toBe('Create Member Profile');
  });

  it('should have called submit emit', async () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<typeof component>);
    spyOn(component.profileFormSubmit, 'emit').and.callThrough();
    fixture.detectChanges();
    component.submitMemberForm();
    expect(dialog.open).toHaveBeenCalled();
    expect(component.profileFormSubmit.emit).toHaveBeenCalled();
  });
});
