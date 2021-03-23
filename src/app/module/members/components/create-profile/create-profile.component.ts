import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  StatusArray = [];
  accordionAction: String = "Expand all";

  @Input() errorMessage: string;
  @Input() memberForm: FormGroup;
  @Output() submit: EventEmitter<any> = new EventEmitter();

  @ViewChild('resetMemberForm') resetForm: any;

  constructor() { }

  ngOnInit(): void {
    this.StatusArray = [{ "id": 1, "name": "Active" }, { "id": 2, "name": "Inactive" }, { "id": 3, "name": "Pending" }];
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
    if (this.memberForm.valid) {
      this.submit.emit(this.memberForm);
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
