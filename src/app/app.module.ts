import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdListModule, MdIconModule, MdTabsModule, MdToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CallbackComponent } from './callback.component';
import { TrackselectionComponent } from './trackselection/trackselection.component';
import { TrackComponent } from './track.component';
import { QuizComponent } from './quiz/quiz.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';


@NgModule({
  declarations: [
    AppComponent, CallbackComponent, TrackselectionComponent, TrackComponent, LandingComponent, QuizComponent, HeaderBarComponent
  ],
  imports: [
    BrowserModule, MdButtonModule, MdCardModule, MdCheckboxModule, MdListModule, MdIconModule, MdTabsModule, HttpModule, FormsModule, FlexLayoutModule, MdToolbarModule, BrowserAnimationsModule, StickyModule,
	  RouterModule.forRoot([
      {
        path: 'app',
        component: LandingComponent
      }, 
		  { path: '',
			redirectTo: '/app',
			pathMatch: 'full'
  		},{
        path: 'callback',
        component: CallbackComponent
      },{
        path: 'quiz',
        component: QuizComponent
	  },{
        path: 'trackselection',
        component: TrackselectionComponent
	  }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
