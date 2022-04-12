import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbAutocompleteModule,
  NbCardModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';

import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteGroupingComponent } from './components/autocomplete-grouping/autocomplete-grouping.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    AutocompleteGroupingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    AppRoutingModule,
    NbButtonModule,
    NbAutocompleteModule,
    NbCardModule,
    ReactiveFormsModule,
    LayoutComponent,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
