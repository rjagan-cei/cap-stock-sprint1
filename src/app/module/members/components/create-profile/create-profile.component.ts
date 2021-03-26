import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { CREATE_PROFILE_SAVE_DIALOG_MESSAGE } from 'src/app/common/dialog-message';
import { booleanArray, memberNamePattern, statusCodeArray, statusTypeArray } from 'src/app/shared/model/const';
import { Lookup } from 'src/app/shared/model/lookup';
import { ConfirmDialogModel, ConfirmationDialog } from 'src/app/shared/module/common/components/confirmation-dialog/confirmation-dialog.component';
import { LookupService } from 'src/app/shared/service/lookup.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  statusCodeArray = statusCodeArray;
  statusTypeArray = statusTypeArray;
  booleanArray = booleanArray;
  accordionAction: String = "Expand all";

  @Input() searchResults: any;
  @Input() errorMessage: string;
  @Input() memberForm: FormGroup;
  @Output() profileFormsubmit: EventEmitter<any> = new EventEmitter();

  statusCodes$: Observable<Array<Lookup>>;
  statusTypes$: Observable<Array<Lookup>>;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private _location: Location, private lookupService: LookupService) { }

  ngOnInit(): void {
    this.statusCodes$ = this.lookupService.statusCodes$;
    this.statusTypes$ = this.lookupService.statusTypes$;
  }

  fetchEvent(event: any) {
    this.searchResults = event;
    this.memberForm = this.formBuilder.group({
      memberNumber: [this.searchResults.memberNumber],
      memberName: [this.searchResults.memberName, [Validators.required, Validators.pattern(memberNamePattern)]],
      statusCode: [this.searchResults.statusCode, [Validators.required]],
      statusType: [this.searchResults.statusType, [Validators.required]],
      initialStockPurchaseRequired: [this.searchResults.initialStockPurchaseRequired],
      capitalStockAsset: [this.searchResults.capitalStockAsset, [Validators.required]],
      capitalStockAssetDate: [this.searchResults.capitalStockAssetDate, [Validators.required]],
      pendingStockAsset: [this.searchResults.pendingStockAsset],
      pendingStockAssetDate: [this.searchResults.pendingStockAssetDate, [Validators.required]],
      memberStockAssetDate: [this.searchResults.memberStockAssetDate],
      memberDdaAccount: [this.searchResults.memberDdaAccount],
      mrcs: [this.searchResults.mrcs],
      mrcsInputDate: [this.searchResults.mrcsInputDate],
      mrcsRedemptionDate: [this.searchResults.mrcsRedemptionDate],
      memberStockMaxRequirement: [this.searchResults.memberStockMaxRequirement]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm.controls[controlName].hasError(errorName);
  }

  submitMemberForm() {
    if (this.memberForm.valid) {
      this.confirmDialog();
    }
  }

  toggleAccordionPanel(e: any) {
    if (e.includes("Expand")) {
      this.accordion.openAll();
      this.accordionAction = "Collapse All";
    } else {
      this.accordion.closeAll();
      this.accordionAction = "Expand All";
    }
  }

  onCancel() {
    this.memberForm.reset();
    this._location.back();
  }

  confirmDialog(): void {
    const dialogData = new ConfirmDialogModel(CREATE_PROFILE_SAVE_DIALOG_MESSAGE, "Save", "Cancel");
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.profileFormsubmit.emit(this.memberForm);
      }
    });
  }

}
