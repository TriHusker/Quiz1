import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class QuizService {
  // quiz: Observable<IQuiz[]>;
  private _quiz: BehaviorSubject<IQuiz[]>;
  private baseUrl: string;
  private IFSDb: string;
  private dataStore: {
    quiz: IQuiz[],
    error: string
  };

  constructor(private http: Http) {
    this.IFSDb = 'IFSTEST5';
    // this.baseUrl = `http://48gitomd:8080/consignment-sales/webapi/IFSTEST5/OrderLineSplit`;
    this.baseUrl = 'app/services/'
    this.dataStore = { quiz: [], error: '' };
    this._quiz = <BehaviorSubject<IQuiz[]>>new BehaviorSubject([]);
  }

  get quiz() {
    return this._quiz.asObservable();
  }

  loadQuiz(selectedQuiz: string) {
    if (selectedQuiz){
    console.log(selectedQuiz);
    this.http.get(`${this.baseUrl}/${selectedQuiz}`)
      .map(unwrapJsonData)
      .subscribe(data => {
        this.dataStore.quiz = data;
        this.dataStore.error = '';
        this._quiz.next(Object.assign({}, this.dataStore).quiz);
      }, error => {
        this._quiz.error(error);
      }
      );
  }}

}


function unwrapJsonData(res: Response) {
  return res.json();
}

export interface IQuiz {
  question: number;
  answer: number;
}