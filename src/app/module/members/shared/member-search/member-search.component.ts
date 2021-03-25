import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { memberNamePattern } from 'src/app/shared/model/const';
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
  searchResults$: any;
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

  submitMemberSearchForm() {
    
    this.memberService.searchMember(this.searchForm.value.memberNumber)
      .subscribe((data) => {
        this.searchResults$ = data[0];
        this.isSearched = true;
        this.searchEmitter.emit(this.isSearched);
        console.log("Member Search Results -> " + this.searchResults$);
      },
        error => {
          this.errorMessage = error;
        });
  }

}
