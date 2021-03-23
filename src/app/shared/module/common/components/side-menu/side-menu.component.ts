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
          route: "/list-members"
        },
        {
          displayName: "Create Member Summary",
          iconName: "lightbulb",
          route: "/dashboard"
        },
        {
          displayName: "View Member Summary",
          iconName: "supervisor_account",
          route: "/dashboard"
        }
      ]
    },
    {
      displayName: "Global Profile",
      iconName: "visibility",
      route: "/dashboard"
    },
    {
      displayName: "Mergers",
      iconName: "person",
      route: "/dashboard"
    }
  ];

  constructor(private navService: NavService) { }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}
