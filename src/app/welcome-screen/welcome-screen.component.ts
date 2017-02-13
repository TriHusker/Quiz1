import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {
  isValid: boolean;
  quizSelection: string[];
  selectedQuiz: string;
  constructor(private router: Router) { }

  goToQuiz() {
    this.router.navigate(['/quiz', this.selectedQuiz]);
    console.log(this.selectedQuiz);
  }

  selectQuiz() {
    this.quizSelection = [];
    if (this.selectedQuiz) {
      this.isValid = false;
    }
  }

  ngOnInit() {
    this.quizSelection = ['attributes.json', 'elements.json','cssbackground.json', 'cssbasicboxproperties.json',
                         'flexibleboxlayouts.json','textproperties.json']
  }

}
