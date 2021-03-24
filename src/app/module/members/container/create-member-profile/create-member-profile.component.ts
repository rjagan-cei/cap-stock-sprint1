import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { memberNamePattern } from 'src/app/shared/model/const';
import { MemberService } from '../../service/member.service';

@Component({
  templateUrl: './create-member-profile.component.html',
  styleUrls: ['./create-member-profile.component.scss']
})
export class CreateMemberProfileComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();

  constructor(private formBuilder: FormBuilder, private memberService: MemberService, private ngZone: NgZone, private router: Router) {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  memberForm: FormGroup;
  errorMessage: String;

  ngOnInit(): void {
    this.createMemberForm();
  }

  createMemberForm() {
    this.memberForm = this.formBuilder.group({
      memberNumber: [''],
      memberName: ['', [Validators.required, Validators.pattern(memberNamePattern)]],
      statusCode: ['', [Validators.required]],
      statusType: ['', [Validators.required]],
      initialStockPurchaseRequired: [{ value: 'Yes', disabled: true }],
      capitalStockAsset: ['', [Validators.required]],
      capitalStockAssetDate: ['', [Validators.required]],
      pendingStockAsset: [''],
      pendingStockAssetDate: ['', [Validators.required]],
      memberStockAssetDate: [''],
      memberDdaAccount: [{ value: '000 01 10 11', disabled: true }],
      mrcs: [''],
      mrcsInputDate: [''],
      mrcsRedemptionDate: [''],
      memberStockMaxRequirement: ['']
    })
  }

  submitMemberForm(memberForm: FormGroup) {
    this.memberService.createMember(memberForm.value)
      .subscribe(() => {
        this.ngZone.run(() => { this.router.navigate(['/dashboard']) });
      },
        error => {
          this.errorMessage = error;
        });
  }

}
