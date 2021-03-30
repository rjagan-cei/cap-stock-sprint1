import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { MemberSearchComponent } from './member-search.component';

describe('Test Member Search Component', () => {
  let component: MemberSearchComponent;
  let fixture: ComponentFixture<MemberSearchComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let dialog: MatDialog;

  class MatDialogMock {
    open() {
      return {
        afterClosed: () => of({ name: 'some object' })
      };
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ MemberSearchComponent ],
      providers: [{ provide: FormBuilder, useValue: formBuilder }, { provide: MatDialog, useClass: MatDialogMock }, { provide: MatDialogRef, useValue: {} }]
    })
    .compileComponents();
    dialog = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSearchComponent);
    component = fixture.componentInstance;
    component.searchForm = formBuilder.group({
      memberNumber: [''],
    })
    fixture.detectChanges();
    const controls = component.searchForm.controls;
    for (const control in controls) {
      controls[control].clearValidators();
      controls[control].updateValueAndValidity({ onlySelf: true });
      component.searchForm.updateValueAndValidity();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.searchForm instanceof FormGroup).toBe(true);
  });
});
