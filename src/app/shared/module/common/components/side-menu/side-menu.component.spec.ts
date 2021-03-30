import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NavService } from 'src/app/core/services/nav.service';
import { routes } from 'src/app/module/members/members-routing.module';
import { AngularMaterialModule } from '../../../material/material.module';
import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let service: NavService;
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ SideMenuComponent ],
      providers: [ NavService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NavService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
