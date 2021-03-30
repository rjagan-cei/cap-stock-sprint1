import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  isSearched : Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  searchEmitter(searchStatus: Boolean) {
    this.isSearched = searchStatus;
  }
}
