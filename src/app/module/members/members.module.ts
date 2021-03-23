import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../../shared/module/material/material.module';
import { MembersRoutingModule } from './members-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { MemberService } from './service/member.service';
import { CreateMemberProfileComponent } from './container/create-member-profile/create-member-profile.component';
import { MemberSearchComponent } from './shared/member-search/member-search.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';

@NgModule({
  declarations: [
    CreateMemberProfileComponent,
    CreateProfileComponent,
    MemberSearchComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    MembersRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, MemberService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembersModule { }

