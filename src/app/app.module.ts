import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { QuizScreenComponent } from './quiz-screen/quiz-screen.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { OneQuestionComponent } from './one-question/one-question.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'quiz/:quiz', component: QuizScreenComponent },
  { path: 'welcome', component: WelcomeScreenComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    QuizScreenComponent,
    QuizQuestionsComponent,
    OneQuestionComponent,
    WelcomeScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
