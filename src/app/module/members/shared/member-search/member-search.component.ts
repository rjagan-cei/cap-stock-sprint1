import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss']
})
export class MemberSearchComponent implements OnInit {

  searchForm: FormGroup;
  @Input() searchResults: any;
  @Output() fetchResults: EventEmitter<any> = new EventEmitter();
  errorMessage: String;

  constructor(private formBuilder: FormBuilder, private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      memberNumber: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.searchForm.controls[controlName].hasError(errorName);
  }

  searchMemberForm() {
    this.memberService.searchMember(this.searchForm.value.memberNumber)
      .subscribe((data: any) => {
        // call objectmapper and convert it to Member object..
        this.searchResults = data[0];
        this.fetchResults.emit(this.searchResults);
      },
        error => {
          this.errorMessage = error;
        });
  }

}
