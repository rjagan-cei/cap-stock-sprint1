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

  @Input() searchResults : any;

  @Input() errorMessage: string;
  @Input() memberForm: FormGroup;
  @Output() profileFormsubmit: EventEmitter<any> = new EventEmitter();

  @ViewChild('resetMemberForm') resetForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.searchResults);
  }

  fetchEvent(event: any) {
    this.searchResults = event;
    console.log("presentation ->" + this.searchResults);
    this.memberForm = this.formBuilder.group({
      memberNumber: [this.searchResults.memberNumber],
      memberName: [this.searchResults.memberName, [Validators.required, Validators.pattern(memberNamePattern)]],
      statusCode: ['', [Validators.required]],
      statusType: ['', [Validators.required]],
      initialStockPurchaseRequired: [{ value: this.searchResults.initialStockPurchaseRequired, disabled: true }],
      capitalStockAsset: ['', [Validators.required]],
      capitalStockAssetDate: ['', [Validators.required]],
      pendingStockAsset: [''],
      pendingStockAssetDate: ['', [Validators.required]],
      memberStockAssetDate: [''],
      memberDdaAccount: [{ value: this.searchResults.memberDdaAccount, disabled: true }],
      mrcs: [''],
      mrcsInputDate: [''],
      mrcsRedemptionDate: [''],
      memberStockMaxRequirement: ['']
    }) 
  }

  /* Date */
  formatDate(fieldName: string | (string | number)[], e: { target: { value: string | number | Date; }; }) {
    var convertedDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.memberForm.get(fieldName).setValue(convertedDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm.controls[controlName].hasError(errorName);
  }

  submitMemberForm() {
    //if (this.memberForm.valid) {
      this.profileFormsubmit.emit(this.memberForm);
    //}
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
