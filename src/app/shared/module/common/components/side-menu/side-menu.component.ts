import { AfterViewInit, Component, ElementRef, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavService } from 'src/app/core/services/nav.service';
import { NavItem } from 'src/app/shared/model/nav-item';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements AfterViewInit {

  @ViewChild("appDrawer") appDrawer: ElementRef;
  version = VERSION;

  navItems: NavItem[] = [
    {
      displayName: "Dashboard",
      iconName: "dashboard",
      route: "/dashboard"
    },
    {
      displayName: "Members",
      iconName: "account_circle",
      route: "",
      children: [
        {
          displayName: "Create Member Profile",
          iconName: "face",
          route: "/create-member-profile"
        },
        {
          displayName: "View Member Profile",
          iconName: "fingerprint",
          route: "/view-member-profile"
        },
        {
          displayName: "Create Member Summary",
          iconName: "lightbulb",
          route: "/create-member-summary"
        },
        {
          displayName: "View Member Summary",
          iconName: "supervisor_account",
          route: "/view-member-summary"
        }
      ]
    },
    {
      displayName: "Global Profile",
      iconName: "visibility",
      route: "/global-profile"
    },
    {
      displayName: "Mergers",
      iconName: "person",
      route: "/mergers"
    }
  ];

  constructor(private navService: NavService) { }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}
