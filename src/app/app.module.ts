import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app-component/app.component';
import { NumericDirective } from './core/directives/numeric.directive';
import { FooterComponent } from './shared/module/common/components/footer/footer.component';
import { HeaderComponent } from './shared/module/common/components/header/header.component';
import { MenuListItemComponent } from './shared/module/common/components/menu-list-item/menu-list-item.component';
import { SideMenuComponent } from './shared/module/common/components/side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './shared/module/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NavService } from './core/services/nav.service';

@NgModule({
  declarations: [
    AppComponent,
    NumericDirective,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    MenuListItemComponent,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({positionClass: 'toast-top-center'}),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, NavService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
