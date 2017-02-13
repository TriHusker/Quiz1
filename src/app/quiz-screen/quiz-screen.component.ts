import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService, IQuiz } from '../services/quiz.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'quiz-screen',
  providers: [QuizService],
  templateUrl: './quiz-screen.component.html',
  styleUrls: ['./quiz-screen.component.css']
})
export class QuizScreenComponent implements OnInit {
  quiz: Observable<IQuiz[]>;
  isValid: boolean;
  working = false;
  question: string;
  answer: string;
  err: string;
  oneQuestion: any;
  questionNumber: number;
  answerArray: string[];
  selectedQuiz: string;


  constructor(private quizApi: QuizService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  randomNumber(maxNumber: number): number {
    let x = Math.floor((Math.random() * maxNumber));
    return x;
  }

  checkValid(isValid: boolean) {
    console.log(isValid);
    this.isValid = isValid;
  }

  testQty() {
    this.quiz.subscribe(data => {
      console.log(data);
    })
  }

  generateQuestion(questionId: number, revealAnswer: boolean) {
    this.quiz.subscribe(data => {
      if (data.length > 0) {
        this.answerArray = [];
        console.log(typeof questionId);
        if(typeof questionId !== 'undefined') {
          if(questionId>0 && questionId <= data.length) {
            this.questionNumber = questionId;
          } else {
            alert("Invalid Question Id. Showing Random Question");
            this.questionNumber = this.randomNumber(data.length - 1);
          }
        } else {
          this.questionNumber = this.randomNumber(data.length - 1);
        }
        this.answerArray.push(data[this.questionNumber]['Answer']);
        this.answerArray.push(data[this.randomNumber(data.length - 1)]['Answer']);
        this.answerArray.push(data[this.randomNumber(data.length - 1)]['Answer']);
        this.answerArray.push(data[this.randomNumber(data.length - 1)]['Answer']);
        console.log(this.questionNumber);
        console.log(data);
        // this.oneQuestion = data[0];
        this.oneQuestion = {
          Question: data[this.questionNumber]['Question'], Answer: this.answerArray, revealAnswer: revealAnswer
        };
        console.log(this.oneQuestion);
        console.log(data[0]['Question']);
      }
    })
  }

  homeScreen(){
    this.router.navigate(['/welcome']);
  }

  ngOnInit() {
    this.answerArray = [];
    this.quiz = this.quizApi.quiz;


    this.route.params.subscribe(params => {
      this.selectedQuiz = params['quiz'];
      console.log(this.selectedQuiz);
      this.quizApi.loadQuiz(this.selectedQuiz);
      var questionId = this.route.snapshot.queryParams['force_question_id'];
      var revealAnswer = this.route.snapshot.queryParams['reveal_answer'];
      console.log('question-------', questionId, revealAnswer);
      this.generateQuestion(questionId, (revealAnswer == 'true'));
    })

    // Load the consignments from the consignment service
    // this.quizApi.loadQuiz(this.selectedQuiz);
    // })

    // Subscribe to the consignment observable and watch for changes in the data
    // When the data changes, it was updated and the working animation should stop
    // The initial load is an empty array and should be ignored.
    this.quizApi.quiz.subscribe((data) => {
      this.err = '';
      if (data.length != 0) {
        console.log(data);
      }
    },
      (error) => {
        if (error.status == 500) {
          this.err = error._body;
        }
        else if (error.status == 404) {
          this.err = 'There was a problem.';
        }
      })
  }


}
