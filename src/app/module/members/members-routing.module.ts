import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMemberProfileComponent } from './container/create-member-profile/create-member-profile.component';

export const routes: Routes = [
  { path: 'create-member-profile', component:  CreateMemberProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }