import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() isSearched: Boolean;
  @Output() searchEmitter : EventEmitter<any> = new EventEmitter();

  searchForm: FormGroup;
  @Output() searchResults: EventEmitter<any> = new EventEmitter();
  errorMessage: String;

  ngOnInit(): void {
    this.createSearchForm();
    console.log(this.isSearched);
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
        this.searchResults.emit(data[0]);
      },
        error => {
          this.errorMessage = error;
        });
  }

}
