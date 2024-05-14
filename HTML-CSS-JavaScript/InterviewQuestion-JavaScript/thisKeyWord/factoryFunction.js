
// student function is to create students using Factory functions;
let student = function (name, classes, marks) {
  let obj = {};
  obj.name = name;
  obj.classes = classes;
  obj.marks = marks;
  obj.showMarks = function () {
    return obj.marks;
  };
  return obj;
};

// update function is for update students marks;
let update = function () {
  let obj = {};
  obj.updateMathsMark = function (student, mark) {
    student.marks.maths += mark;
  };
  obj.updateEnglishMark = function (student, mark) {
    student.marks.english += mark;
  };
  obj.updateScienceMark = function (student, mark) {
    student.marks.science += mark;
  };
  return obj;
};

// this is for creating a new student;
let ranjan = student("Ranjan", "12th", { maths: 90, english: 87, science: 95 });

// this is for giving permission to update the student marks;
let teacher = update();

teacher.updateMathsMark(ranjan, 10);
console.log(ranjan.showMarks());

teacher.updateEnglishMark(ranjan, -10);
console.log(ranjan.showMarks());

teacher.updateScienceMark(ranjan, -1);
console.log(ranjan.showMarks());
