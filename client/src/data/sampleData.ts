import { 
  Exam, 
  ExamTaken, 
  ExamResult, 
  LeaderboardEntry, 
  PerformanceStats,
  ExamAnalytics
} from "@/types";

// Sample Exams
export const sampleExams: Exam[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics, including variables, functions, and control flow.",
    totalQuestions: 10,
    duration: 20, // in minutes
    passingScore: 70, // percentage
    questions: [
      {
        id: "q1",
        text: "Which of the following is not a JavaScript data type?",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Boolean" },
          { id: "c", text: "Float" },
          { id: "d", text: "Symbol" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q2",
        text: "What will the following code return: console.log(typeof [])?",
        options: [
          { id: "a", text: "array" },
          { id: "b", text: "object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "null" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q3",
        text: "Which method adds an element to the end of an array?",
        options: [
          { id: "a", text: "push()" },
          { id: "b", text: "pop()" },
          { id: "c", text: "shift()" },
          { id: "d", text: "unshift()" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q4",
        text: "What is the correct way to create a function in JavaScript?",
        options: [
          { id: "a", text: "function = myFunction() {}" },
          { id: "b", text: "function:myFunction() {}" },
          { id: "c", text: "function myFunction() {}" },
          { id: "d", text: "create myFunction() {}" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q5",
        text: "What does the following code do?\nlet arr = [1, 2, 3];\nlet newArr = [...arr, 4, 5];",
        options: [
          { id: "a", text: "Creates a clone of arr and adds 4 and 5 to the end" },
          { id: "b", text: "Adds 4 and 5 to arr directly" },
          { id: "c", text: "Creates a reference to arr and adds 4 and 5" },
          { id: "d", text: "Throws a syntax error" }
        ],
        difficulty: "Medium",
        code: "let arr = [1, 2, 3];\nlet newArr = [...arr, 4, 5];"
      },
      {
        id: "q6",
        text: "What is the output of the following code?\nlet x = 10;\n(function() {\n  console.log(x);\n  var x = 20;\n})();",
        options: [
          { id: "a", text: "10" },
          { id: "b", text: "20" },
          { id: "c", text: "undefined" },
          { id: "d", text: "Reference Error" }
        ],
        difficulty: "Hard",
        code: "let x = 10;\n(function() {\n  console.log(x);\n  var x = 20;\n})();"
      },
      {
        id: "q7",
        text: "What is a closure in JavaScript?",
        options: [
          { id: "a", text: "A way to secure your code from external access" },
          { id: "b", text: "A function that has access to variables in its outer lexical environment" },
          { id: "c", text: "A method to close unused resources" },
          { id: "d", text: "A design pattern used for inheritance" }
        ],
        difficulty: "Hard"
      },
      {
        id: "q8",
        text: "Which method is used to serialize an object into a JSON string?",
        options: [
          { id: "a", text: "JSON.parse()" },
          { id: "b", text: "JSON.stringify()" },
          { id: "c", text: "JSON.toText()" },
          { id: "d", text: "JSON.serialize()" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q9",
        text: "What is the correct syntax for a JavaScript arrow function?",
        options: [
          { id: "a", text: "function => {}" },
          { id: "b", text: "=> function {}" },
          { id: "c", text: "() => {}" },
          { id: "d", text: "=> () {}" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q10",
        text: "Which method is used to remove the last element from an array?",
        options: [
          { id: "a", text: "shift()" },
          { id: "b", text: "unshift()" },
          { id: "c", text: "pop()" },
          { id: "d", text: "remove()" }
        ],
        difficulty: "Easy"
      }
    ]
  },
  {
    id: "2",
    title: "React Essentials",
    description: "Test your understanding of React's core concepts and features.",
    totalQuestions: 8,
    duration: 15,
    passingScore: 75,
    questions: [
      {
        id: "q1",
        text: "What is React?",
        options: [
          { id: "a", text: "A JavaScript library for building user interfaces" },
          { id: "b", text: "A server-side programming language" },
          { id: "c", text: "A database management system" },
          { id: "d", text: "A complete frontend framework" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q2",
        text: "What are React components?",
        options: [
          { id: "a", text: "JavaScript functions that return HTML elements" },
          { id: "b", text: "CSS styles that are applied to HTML" },
          { id: "c", text: "Database schemas" },
          { id: "d", text: "Server-side functions" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q3",
        text: "What is JSX?",
        options: [
          { id: "a", text: "JavaScript XML - A syntax extension for JavaScript" },
          { id: "b", text: "A JavaScript package manager" },
          { id: "c", text: "JavaScript Extra - A new JavaScript version" },
          { id: "d", text: "A React component library" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q4",
        text: "What is the correct way to render a list in React?",
        options: [
          { id: "a", text: "Using a for loop inside the render method" },
          { id: "b", text: "Using the map() function to iterate through the list" },
          { id: "c", text: "Using a while loop in JSX" },
          { id: "d", text: "React doesn't support rendering lists" }
        ],
        difficulty: "Medium",
        code: "function MyList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>{item.name}</li>\n      ))}\n    </ul>\n  );\n}"
      },
      {
        id: "q5",
        text: "What are React hooks?",
        options: [
          { id: "a", text: "Special HTML attributes used in React" },
          { id: "b", text: "Functions that let you use state and other React features without writing a class" },
          { id: "c", text: "CSS hooks for styling React components" },
          { id: "d", text: "Event handlers for React components" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q6",
        text: "What is the purpose of the useEffect hook?",
        options: [
          { id: "a", text: "To create a new React component" },
          { id: "b", text: "To perform side effects in function components" },
          { id: "c", text: "To style React components" },
          { id: "d", text: "To create animations" }
        ],
        difficulty: "Hard"
      },
      {
        id: "q7",
        text: "What does the useState hook return?",
        options: [
          { id: "a", text: "A single state value" },
          { id: "b", text: "A state object with multiple values" },
          { id: "c", text: "An array with the current state value and a function to update it" },
          { id: "d", text: "A function to set the state only" }
        ],
        difficulty: "Medium",
        code: "const [count, setCount] = useState(0);"
      },
      {
        id: "q8",
        text: "How do you pass data from a parent to a child component in React?",
        options: [
          { id: "a", text: "Using global variables" },
          { id: "b", text: "Using props" },
          { id: "c", text: "Using context only" },
          { id: "d", text: "Using Redux only" }
        ],
        difficulty: "Easy"
      }
    ]
  },
  {
    id: "3",
    title: "Node.js Advanced",
    description: "Test your knowledge about Node.js advanced topics including async programming and modules.",
    totalQuestions: 5,
    duration: 10,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        text: "What is Node.js primarily used for?",
        options: [
          { id: "a", text: "Building desktop applications" },
          { id: "b", text: "Server-side JavaScript programming" },
          { id: "c", text: "Mobile app development" },
          { id: "d", text: "Browser-based applications" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q2",
        text: "Which of the following is NOT a core module in Node.js?",
        options: [
          { id: "a", text: "fs" },
          { id: "b", text: "http" },
          { id: "c", text: "path" },
          { id: "d", text: "react" }
        ],
        difficulty: "Medium"
      },
      {
        id: "q3",
        text: "What does the following code do?",
        options: [
          { id: "a", text: "Creates a new file" },
          { id: "b", text: "Reads a file asynchronously" },
          { id: "c", text: "Deletes a file" },
          { id: "d", text: "Renames a file" }
        ],
        difficulty: "Medium",
        code: "const fs = require('fs');\nfs.readFile('file.txt', 'utf8', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});"
      },
      {
        id: "q4",
        text: "What tool is typically used to manage Node.js packages in a project?",
        options: [
          { id: "a", text: "pip" },
          { id: "b", text: "gradle" },
          { id: "c", text: "npm" },
          { id: "d", text: "maven" }
        ],
        difficulty: "Easy"
      },
      {
        id: "q5",
        text: "How do you create a basic HTTP server in Node.js?",
        options: [
          { id: "a", text: "Using the 'server' module" },
          { id: "b", text: "Using the 'http' module" },
          { id: "c", text: "Using the 'httpserver' package" },
          { id: "d", text: "Node.js cannot create HTTP servers" }
        ],
        difficulty: "Hard",
        code: "const http = require('http');\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello World');\n});\nserver.listen(3000);"
      }
    ]
  }
];

// Sample Exam Taken
export const sampleExamTaken: ExamTaken = {
  id: "et-1",
  userId: "user-1",
  examId: "1",
  startTime: new Date().toISOString(),
  status: 'in-progress'
};

// Sample Exam Result
export const sampleExamResult: ExamResult = {
  examId: "1",
  score: 80,
  totalQuestions: 10,
  correctAnswers: 8,
  incorrectAnswers: 2,
  passed: true,
  passingScore: 70,
  userAnswers: [
    { questionId: "q1", selectedOptionId: "c" },
    { questionId: "q2", selectedOptionId: "b" },
    { questionId: "q3", selectedOptionId: "a" },
    { questionId: "q4", selectedOptionId: "c" },
    { questionId: "q5", selectedOptionId: "a" },
    { questionId: "q6", selectedOptionId: "c" },
    { questionId: "q7", selectedOptionId: "b" },
    { questionId: "q8", selectedOptionId: "b" },
    { questionId: "q9", selectedOptionId: "c" },
    { questionId: "q10", selectedOptionId: "c" }
  ]
};

// Sample leaderboard data
export const sampleLeaderboard: LeaderboardEntry[] = [
  {
    userId: "user-1",
    username: "Alice Johnson",
    score: 92,
    completionTime: 1800, // 30 minutes
    examId: "1",
    examTitle: "JavaScript Fundamentals",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    userId: "user-2",
    username: "Bob Smith",
    score: 85,
    completionTime: 2100, // 35 minutes
    examId: "2",
    examTitle: "React Essentials",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    userId: "user-3",
    username: "Charlie Brown",
    score: 78,
    completionTime: 1920, // 32 minutes
    examId: "1",
    examTitle: "JavaScript Fundamentals",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    userId: "user-4",
    username: "Diana Prince",
    score: 95,
    completionTime: 1680, // 28 minutes
    examId: "3",
    examTitle: "Node.js Advanced",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    userId: "user-5",
    username: "Ethan Hunt",
    score: 72,
    completionTime: 2220, // 37 minutes
    examId: "2",
    examTitle: "React Essentials",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    userId: "user-6",
    username: "Fiona Gallagher",
    score: 88,
    completionTime: 1980, // 33 minutes
    examId: "3",
    examTitle: "Node.js Advanced",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
  },
  {
    userId: "user-7",
    username: "George Lucas",
    score: 81,
    completionTime: 2040, // 34 minutes
    examId: "1",
    examTitle: "JavaScript Fundamentals",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    userId: "user-1",
    username: "Alice Johnson",
    score: 90,
    completionTime: 1860, // 31 minutes
    examId: "3",
    examTitle: "Node.js Advanced",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago
  }
];

// Sample performance stats
export const samplePerformanceStats: PerformanceStats = {
  totalExamsTaken: 15,
  averageScore: 84,
  highestScore: 95,
  totalPassed: 12,
  totalFailed: 3,
  examCountByCategory: {
    "JavaScript": 6,
    "React": 5,
    "Node.js": 4
  },
  scoreByDifficulty: {
    "Easy": 90,
    "Medium": 82,
    "Hard": 71
  }
};

// Sample exam analytics
export const sampleExamAnalytics: ExamAnalytics[] = sampleExams.map((exam) => ({
  examId: exam.id,
  title: exam.title,
  totalAttempts: Math.floor(Math.random() * 15) + 5, // random between 5-20
  averageScore: Math.floor(Math.random() * 30) + 65, // random between 65-95
  passRate: Math.floor(Math.random() * 40) + 60, // random between 60-100
  averageCompletionTime: Math.floor(Math.random() * 1800) + 1200, // random between 20-50 minutes in seconds
  difficultQuestions: exam.questions.slice(0, 3).map(q => ({
    questionId: q.id,
    text: q.text,
    failRate: Math.floor(Math.random() * 60) + 40 // random between 40-100%
  }))
}));