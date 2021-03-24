import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMemberProfileComponent } from './container/create-member-profile/create-member-profile.component';
import { ViewMemberProfileComponent } from './container/view-member-profile/view-member-profile.component';

export const routes: Routes = [
  { path: 'create-member-profile', component:  CreateMemberProfileComponent},
  { path: 'view-member-profile', component:  ViewMemberProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }