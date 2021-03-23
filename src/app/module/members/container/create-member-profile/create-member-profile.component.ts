import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
      memberName: ['', [Validators.required]],
      status: ['', [Validators.required]],
      stockMembershipDate: ['', [Validators.required]],
      financialDataDate: ['', [Validators.required]],
      totalAssets: ['', [Validators.required]],
      electedAssets: ['', [Validators.required]],
      membershipRepurchaseFlag: [{value: 'Yes', disabled: true}],
      membershipRedemptionFlag: [{value: 'No', disabled: true}],
      activityRepurchaseFlag: [{value: 'Yes', disabled: true}],
      activityRedemptionFlag: [{value: 'No', disabled: true}],
      activityAccount: [{value: '000 001 010 011', disabled: true}],
      dividendAccount: [{value: '100 101 110 111', disabled: true}],
      ddaAccount: [{value: '200 201 210 211', disabled: true}],
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
