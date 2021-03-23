import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss']
})
export class MemberSearchComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private memberService: MemberService) {
  }

  searchForm: FormGroup;
  errorMessage: String;

  ngOnInit(): void {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      memberNumber: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.searchForm.controls[controlName].hasError(errorName);
  }

  submitMemberSearchForm() {
    this.memberService.searchMember(this.searchForm.value)
      .subscribe(() => {},
        error => {
          this.errorMessage = error;
        });
  }

}
