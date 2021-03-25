import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersRoutingModule } from './module/members/members-routing.module';
import { DashboardComponent } from './module/members/shared/dashboard/dashboard.component';

export const routes: Routes = [
  { path: "dashboard", component: DashboardComponent},
  { path: "members", loadChildren: () =>
      import("./module/members/members.module").then(m => m.MembersModule)
  }
];

@NgModule({
  imports: [MembersRoutingModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
