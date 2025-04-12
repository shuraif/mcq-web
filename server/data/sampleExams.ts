import { Exam, ExamResult, ExamTaken } from '../../client/src/types';

// Sample exam data
export const sampleExams: Exam[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control flow.",
    totalQuestions: 10,
    duration: 20,
    passingScore: 70,
    questions: [
      {
        id: "q1-1",
        text: "Which of the following is NOT a primitive data type in JavaScript?",
        options: [
          { id: "q1-opt1", text: "String" },
          { id: "q1-opt2", text: "Number" },
          { id: "q1-opt3", text: "Object" },
          { id: "q1-opt4", text: "Boolean" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q1-2",
        text: "What is the output of: console.log(typeof [])?",
        options: [
          { id: "q1-2-opt1", text: "array" },
          { id: "q1-2-opt2", text: "object" },
          { id: "q1-2-opt3", text: "undefined" },
          { id: "q1-2-opt4", text: "null" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q1-3",
        text: "Which method is used to add one or more elements to the end of an array?",
        options: [
          { id: "q1-3-opt1", text: "push()" },
          { id: "q1-3-opt2", text: "pop()" },
          { id: "q1-3-opt3", text: "shift()" },
          { id: "q1-3-opt4", text: "unshift()" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q1-4",
        text: "How do you declare a variable that cannot be reassigned?",
        options: [
          { id: "q1-4-opt1", text: "var" },
          { id: "q1-4-opt2", text: "let" },
          { id: "q1-4-opt3", text: "const" },
          { id: "q1-4-opt4", text: "static" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q1-5",
        text: "What will the following code return? Array.isArray([]);",
        options: [
          { id: "q1-5-opt1", text: "true" },
          { id: "q1-5-opt2", text: "false" },
          { id: "q1-5-opt3", text: "null" },
          { id: "q1-5-opt4", text: "TypeError" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q1-6",
        text: "Which function is used to parse a string to an integer?",
        options: [
          { id: "q1-6-opt1", text: "Integer.parse()" },
          { id: "q1-6-opt2", text: "parseInt()" },
          { id: "q1-6-opt3", text: "parseInteger()" },
          { id: "q1-6-opt4", text: "Number.parseInt()" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q1-7",
        text: "What does the '===' operator do?",
        options: [
          { id: "q1-7-opt1", text: "Checks for equality with type conversion" },
          { id: "q1-7-opt2", text: "Checks for equality without type conversion" },
          { id: "q1-7-opt3", text: "Assigns a value" },
          { id: "q1-7-opt4", text: "Checks if one value is greater than another" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q1-8",
        text: "What is a closure in JavaScript?",
        options: [
          { id: "q1-8-opt1", text: "A way to protect variables from being accessed" },
          { id: "q1-8-opt2", text: "A function that has access to variables in its outer lexical environment" },
          { id: "q1-8-opt3", text: "A method to close a JavaScript file" },
          { id: "q1-8-opt4", text: "A built-in JavaScript object" }
        ],
        difficulty: "Hard"
      },
      {
        id: "q1-9",
        text: "Which method is used to remove the last element from an array?",
        options: [
          { id: "q1-9-opt1", text: "push()" },
          { id: "q1-9-opt2", text: "pop()" },
          { id: "q1-9-opt3", text: "shift()" },
          { id: "q1-9-opt4", text: "unshift()" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q1-10",
        text: "What does the following code return? typeof null",
        options: [
          { id: "q1-10-opt1", text: "null" },
          { id: "q1-10-opt2", text: "undefined" },
          { id: "q1-10-opt3", text: "object" },
          { id: "q1-10-opt4", text: "number" }
        ],
        difficulty: "Medium",
        code: "console.log(typeof null);"
      }
    ]
  },
  {
    id: "2",
    title: "React Basics",
    description: "Test your knowledge of React fundamentals including components, state, and props.",
    totalQuestions: 10,
    duration: 25,
    passingScore: 60,
    questions: [
      {
        id: "q2-1",
        text: "What is JSX in React?",
        options: [
          { id: "q2-1-opt1", text: "JavaScript XML - A syntax extension for JavaScript" },
          { id: "q2-1-opt2", text: "JavaScript Extra - A library for extended JavaScript functionality" },
          { id: "q2-1-opt3", text: "Java Syntax Extension - A way to write Java in React" },
          { id: "q2-1-opt4", text: "JavaScript Xerox - A tool for copying JavaScript code" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q2-2",
        text: "Which hook is used to add state to a functional component?",
        options: [
          { id: "q2-2-opt1", text: "useStateful" },
          { id: "q2-2-opt2", text: "useState" },
          { id: "q2-2-opt3", text: "useEffect" },
          { id: "q2-2-opt4", text: "useContext" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q2-3",
        text: "What is the correct way to render a list in React?",
        options: [
          { id: "q2-3-opt1", text: "Using a for loop inside the render method" },
          { id: "q2-3-opt2", text: "Using the map() function to iterate over the array" },
          { id: "q2-3-opt3", text: "Using the forEach() method inside JSX" },
          { id: "q2-3-opt4", text: "Using a while loop with JSX" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q2-4",
        text: "What is the purpose of the 'key' prop when rendering lists?",
        options: [
          { id: "q2-4-opt1", text: "It's just a required syntax with no specific purpose" },
          { id: "q2-4-opt2", text: "It helps React identify which items have changed, are added, or removed" },
          { id: "q2-4-opt3", text: "It sets the order of elements in the DOM" },
          { id: "q2-4-opt4", text: "It's used for CSS styling specific list items" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q2-5",
        text: "What is a 'prop' in React?",
        options: [
          { id: "q2-5-opt1", text: "A built-in React function" },
          { id: "q2-5-opt2", text: "A type of database for React applications" },
          { id: "q2-5-opt3", text: "Properties passed to a component" },
          { id: "q2-5-opt4", text: "A performance optimization technique" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q2-6",
        text: "What hook would you use to perform side effects in a functional component?",
        options: [
          { id: "q2-6-opt1", text: "useEffect" },
          { id: "q2-6-opt2", text: "useState" },
          { id: "q2-6-opt3", text: "useSideEffect" },
          { id: "q2-6-opt4", text: "useAction" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q2-7",
        text: "What is the React Fragment shorthand syntax?",
        options: [
          { id: "q2-7-opt1", text: "<Fragment></Fragment>" },
          { id: "q2-7-opt2", text: "<Frag></Frag>" },
          { id: "q2-7-opt3", text: "<></>" },
          { id: "q2-7-opt4", text: "<React.Fragment></React.Fragment>" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q2-8",
        text: "What is the purpose of React's Context API?",
        options: [
          { id: "q2-8-opt1", text: "To replace Redux entirely" },
          { id: "q2-8-opt2", text: "To make API calls more efficiently" },
          { id: "q2-8-opt3", text: "To share state across components without prop drilling" },
          { id: "q2-8-opt4", text: "To improve rendering performance" }
        ],
        difficulty: "Hard"
      },
      {
        id: "q2-9",
        text: "What are controlled components in React?",
        options: [
          { id: "q2-9-opt1", text: "Components that don't allow user modifications" },
          { id: "q2-9-opt2", text: "Form elements whose values are controlled by React state" },
          { id: "q2-9-opt3", text: "Components that can only render once" },
          { id: "q2-9-opt4", text: "Higher-order components" }
        ],
        difficulty: "Hard"
      },
      {
        id: "q2-10",
        text: "What is the correct lifecycle method to use for API calls in class components?",
        options: [
          { id: "q2-10-opt1", text: "componentWillMount" },
          { id: "q2-10-opt2", text: "componentDidMount" },
          { id: "q2-10-opt3", text: "componentWillUpdate" },
          { id: "q2-10-opt4", text: "render" }
        ],
        difficulty: "Medium",
        code: "class MyComponent extends React.Component {\n  // Which lifecycle method should contain API calls?\n}"
      }
    ]
  },
  {
    id: "3",
    title: "CSS and Styling",
    description: "Test your knowledge of CSS selectors, properties, and modern styling techniques.",
    totalQuestions: 8,
    duration: 15,
    passingScore: 75,
    questions: [
      {
        id: "q3-1",
        text: "Which CSS property is used to control the spacing between letters?",
        options: [
          { id: "q3-1-opt1", text: "text-spacing" },
          { id: "q3-1-opt2", text: "letter-spacing" },
          { id: "q3-1-opt3", text: "character-spacing" },
          { id: "q3-1-opt4", text: "font-spacing" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q3-2",
        text: "What does CSS stand for?",
        options: [
          { id: "q3-2-opt1", text: "Creative Style Sheets" },
          { id: "q3-2-opt2", text: "Computer Style Sheets" },
          { id: "q3-2-opt3", text: "Cascading Style Sheets" },
          { id: "q3-2-opt4", text: "Colorful Style Sheets" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q3-3",
        text: "Which property is used to change the background color?",
        options: [
          { id: "q3-3-opt1", text: "color" },
          { id: "q3-3-opt2", text: "bgcolor" },
          { id: "q3-3-opt3", text: "background-color" },
          { id: "q3-3-opt4", text: "background" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q3-4",
        text: "What is the correct CSS syntax for selecting an element with id 'demo'?",
        options: [
          { id: "q3-4-opt1", text: "#demo" },
          { id: "q3-4-opt2", text: ".demo" },
          { id: "q3-4-opt3", text: "demo" },
          { id: "q3-4-opt4", text: "*demo" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q3-5",
        text: "Which CSS property is used to control the space between lines of text?",
        options: [
          { id: "q3-5-opt1", text: "line-height" },
          { id: "q3-5-opt2", text: "line-spacing" },
          { id: "q3-5-opt3", text: "text-height" },
          { id: "q3-5-opt4", text: "text-spacing" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q3-6",
        text: "Which CSS value specifies that an element should be displayed as a flexible container?",
        options: [
          { id: "q3-6-opt1", text: "display: block" },
          { id: "q3-6-opt2", text: "display: flex" },
          { id: "q3-6-opt3", text: "display: inline" },
          { id: "q3-6-opt4", text: "display: grid" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q3-7",
        text: "What does the 'box-sizing: border-box' property do?",
        options: [
          { id: "q3-7-opt1", text: "Includes padding and border in the element's total width and height" },
          { id: "q3-7-opt2", text: "Creates a box around the border" },
          { id: "q3-7-opt3", text: "Sets the border to a box shape" },
          { id: "q3-7-opt4", text: "Removes padding from the element" }
        ],
        difficulty: "Hard"
      },
      {
        id: "q3-8",
        text: "Which CSS preprocessor uses the .scss or .sass file extension?",
        options: [
          { id: "q3-8-opt1", text: "LESS" },
          { id: "q3-8-opt2", text: "Stylus" },
          { id: "q3-8-opt3", text: "SASS" },
          { id: "q3-8-opt4", text: "PostCSS" }
        ],
        difficulty: "Medium",
        code: "// This is a style preprocessor example\n$primary-color: #333;\n\n.container {\n  color: $primary-color;\n}"
      }
    ]
  }
];

// Sample exam taken data
export const sampleExamTaken: ExamTaken = {
  id: "et-1",
  userId: "user-1",
  examId: "1",
  startTime: new Date().toISOString(),
  status: 'in-progress'
};

// Sample exam result data
export const sampleExamResult: ExamResult = {
  examId: "1",
  score: 0.8,
  totalQuestions: 10,
  correctAnswers: 8,
  incorrectAnswers: 2,
  passed: true,
  passingScore: 70,
  userAnswers: [
    { questionId: "q1-1", selectedOptionId: "q1-opt3" },
    { questionId: "q1-2", selectedOptionId: "q1-2-opt2" },
    { questionId: "q1-3", selectedOptionId: "q1-3-opt1" },
    { questionId: "q1-4", selectedOptionId: "q1-4-opt3" },
    { questionId: "q1-5", selectedOptionId: "q1-5-opt1" },
    { questionId: "q1-6", selectedOptionId: "q1-6-opt2" },
    { questionId: "q1-7", selectedOptionId: "q1-7-opt2" },
    { questionId: "q1-8", selectedOptionId: "q1-8-opt2" },
    { questionId: "q1-9", selectedOptionId: "q1-9-opt2" },
    { questionId: "q1-10", selectedOptionId: "q1-10-opt3" }
  ]
};