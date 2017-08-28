import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdListModule} from '@angular/material';

import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing.component';
import { CallbackComponent } from './callback.component';
import { TrackselectionComponent } from './trackselection.component';
import { TrackComponent } from './track.component';
import { QuizComponent } from './quiz.component';


@NgModule({
  declarations: [
    AppComponent, CallbackComponent, TrackselectionComponent, TrackComponent, LandingComponent, QuizComponent
  ],
  imports: [
    BrowserModule, MdButtonModule, MdCardModule, MdCheckboxModule, MdListModule, HttpModule,
	  RouterModule.forRoot([
      {
        path: 'app',
        component: AppComponent
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
