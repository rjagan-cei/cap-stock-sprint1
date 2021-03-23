import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersRoutingModule } from './module/members/members-routing.module';

export const routes: Routes = [
  { path: "members", loadChildren: () =>
      import("./module/members/members.module").then(m => m.MembersModule)
  }
];

@NgModule({
  imports: [MembersRoutingModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
