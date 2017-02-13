import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { IQuiz } from '../services/quiz.service';

@Component({
  selector: 'one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css']
})
export class OneQuestionComponent implements OnInit {
  @Input() quiz: any;
  @Output() notify: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  isValid: boolean;
  answerArray: string[];
  selectedAnswer: number;
  correctAnswerIndex: number;
  correctAnswer: number;
  wrongAnswer: number;

  constructor() { }

  randomNumber(maxNumber: number): number {
    let x = Math.floor((Math.random() * maxNumber));
    return x;
  }

  inArray(arr, el) {
    for (let i = 0; i < arr.length; i++)
      if (arr[i] == el) return true;
    return false;
  }

  randomArray(min, max, DuplicateArr) {
    let RandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (DuplicateArr.length > (max - min)) return false;  // break endless recursion
    if (!this.inArray(DuplicateArr, RandomInt)) {
      DuplicateArr.push(RandomInt);
      return RandomInt;
    }
    return this.randomArray(min, max, DuplicateArr); //recurse
  }

  highlightChoice(selectedItem: number) {
    this.correctAnswer = 100;
    this.wrongAnswer = 100;
    if (this.correctAnswerIndex == selectedItem) {
      this.correctAnswer = selectedItem;
      console.log('correct');
    } else {
      this.wrongAnswer = selectedItem;
    }
    // console.log(selectedItem);
    this.selectedAnswer = selectedItem;
  }

  updateQuestion() {
    this.correctAnswer = 100;
    this.wrongAnswer = 100;
    this.answerArray = [];
    if (this.quiz) {
      this.isValid = false;

      let duplicates = [];
      let x: number;
      for (let i = 0; i <= 3; i++) {
        x = this.randomArray(0, 3, duplicates);
        this.answerArray.push(this.quiz.Answer[x]);
        if (x === 0) {
          this.correctAnswerIndex = this.answerArray.length - 1;
        }
        console.log(x);
      }

      if(this.quiz.revealAnswer) {
        this.correctAnswer = this.correctAnswerIndex;
      }
    }
  }

  ngOnChanges(change: { [key: string]: SimpleChange }) {
    if (change['quiz']) {
      // console.log(change['contract'].currentValue);
      this.updateQuestion();
    }
    console.log(change);
  }


  ngOnInit() {
  }

}
