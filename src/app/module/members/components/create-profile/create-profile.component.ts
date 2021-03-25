import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { booleanArray, memberNamePattern, statusCodeArray, statusTypeArray } from 'src/app/shared/model/const';

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
  @ViewChild('resetMemberForm') resetForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

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
      this.profileFormsubmit.emit(this.memberForm);
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

}
