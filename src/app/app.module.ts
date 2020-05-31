import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'; 

import { AppComponent } from './app.component';
import { GridComponent } from './grid.component';
import { LayersComponent } from './layers.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule, 
    MatToolbarModule,
  ],
  declarations: [ AppComponent, GridComponent, LayersComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
