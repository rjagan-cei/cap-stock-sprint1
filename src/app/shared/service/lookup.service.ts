import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepositoryService } from 'src/app/core/services/repository.service';
import { Lookup } from 'src/app/shared/model/lookup';
import { environment } from 'src/environments/environment';

const LOOKUP_PATH = environment.lookupApiPath;

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  statusTypes$ = new BehaviorSubject<Array<Lookup>>([]);
  statusCodes$ = new BehaviorSubject<Array<Lookup>>([]);

  constructor(private repo: RepositoryService) {    
    this.fetchStatusCodes();
    this.fetchStatusTypes();
  }

  public fetchStatusTypes() {
    this.repo
      .get<Array<Lookup>>(LOOKUP_PATH + '/statusTypes')
      .subscribe(statusType => this.statusTypes$.next(statusType));
  }

  public fetchStatusCodes() {
    this.repo
      .get<Array<Lookup>>(LOOKUP_PATH + '/statusCodes')
      .subscribe(statusCode => this.statusCodes$.next(statusCode));
  }

}
