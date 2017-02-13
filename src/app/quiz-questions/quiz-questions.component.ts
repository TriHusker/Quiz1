import { Component, OnInit, Input } from '@angular/core';
import { IQuiz } from '../services/quiz.service';

@Component({
  selector: 'quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit {
  @Input() quiz: any;
  //  @Output() notify: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  isValid: boolean;
  chkShipLine: boolean;
  constructor() { }

  ngOnInit() {
  }

}
