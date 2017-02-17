var casper = require('casper').create({
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

quiz = casper.cli.args[0]; // should end with .json, ex. attributes.json
question = casper.cli.args[1]; // should be a question number, ex. 5

casper.start('http://localhost:4200/quiz/' + quiz + '?force_question_id=' + question + '&reveal_answer=true', function() {
    // setup
    question = casper.cli.args[1]; // should be a question number, ex. 5
    quizname = quiz.replace(/\.[^/.]+$/, "")
    require("utils").dump(casper.cli.args[0]);
    this.viewport(1024, 768);

    // screenshot the question
    this.captureSelector('quiz-' + quizname + '-' + question + '-a.png', '.question');

    // this block of code determines the area of the screen that we need to capture
    bounds = this.getElementsBounds('div.op')
    rect = {
        top: 10000,
        left: 10000,
        right: 0,
        bottom: 0
        //width: 10000,
        //height: 10000
    };
    for (bound in bounds) {
        i = bounds[bound];
        for (dimension in i) {
            console.log(dimension + ' ' + i[dimension]);
        };
        i['right'] = i['width'] + i['left'];

        i['bottom'] = i['top'] + i['height'];
        // bottom is really the top edge of the thing, the distance between the top of the screen and the edge
        console.log('++++++++++++++++++++');
    };
    console.log('--------------------');
    for (bound in bounds) {
        i = bounds[bound];
        rect['top'] = Math.min(rect['top'], i['top']);
        rect['left'] = Math.min(rect['left'], i['left']);
        rect['right'] = Math.max(rect['right'], i['right']);
        rect['bottom'] = Math.max(rect['bottom'], i['bottom']);
    };
    rect['width'] = rect['right'] - rect['left'];
    rect['height'] = rect['bottom'] - rect['top'];
    console.log(Math.max(1.1, 2.2));
    for (dimension in rect) {
        console.log(dimension + ' ' + rect[dimension]);
    };
    target = {
        top: rect['top'],
        left: rect['left'],
        width: rect['width'],
        height: rect['height']
    };

    // screenshot answers with the correct answer marked
    this.capture('quiz-' + quizname + '-' + question + '-c.png', target);  // answers

    // For some reason simply removing the class does not refresh the style
    // Code below  *effectively* removes the .correct-answer class.
    this.evaluate(function() {
        correct_answer = document.querySelector(".correct-answer");
        other_answer = document.querySelector(".op:not(.correct-answer)");
        other_answer.classList.add('marker');
        correct_answer_innerHTML = correct_answer.innerHTML;
        correct_answer.outerHTML = other_answer.outerHTML;
        other_answer.classList.remove('marker');
        correct_answer = document.querySelector(".marker");
        correct_answer.innerHTML = correct_answer_innerHTML;
    });

    // screenshot answers with the correct answer unmarked
    this.capture('quiz-' + quizname + '-' + question + '-b.png', target);  // answers
    return
});

casper.run();

