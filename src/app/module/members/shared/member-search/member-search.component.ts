import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MEMBER_NOT_FOUND_DIALOG_MESSAGE } from 'src/app/common/dialog-message';
import { ConfirmDialogModel, ConfirmationDialog } from 'src/app/shared/module/common/components/confirmation-dialog/confirmation-dialog.component';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss']
})
export class MemberSearchComponent implements OnInit {

  @Input() isSearched: Boolean;
  @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
  @Output() searchResults: EventEmitter<any> = new EventEmitter();

  searchForm: FormGroup;
  errorMessage: String;

  constructor(private formBuilder: FormBuilder, private memberService: MemberService, private dialog: MatDialog) {
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
        if (data.length == 0) {
          this.errorDialog();
        } else {
          this.searchResults.emit(data[0]);
          this.isSearched = true;
          this.searchEmitter.emit(this.isSearched);
        }
      },
        error => {
          this.errorMessage = error;
        });
  }

  errorDialog(): void {
    const dialogData = new ConfirmDialogModel(MEMBER_NOT_FOUND_DIALOG_MESSAGE, "", "Close");
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(() => { });
  }

}
