This project is for the Milestone 4: High-Fi Prototype of **KAIST CS473 Introduction to Social Computing**.

## Api


## pages



## Tools We've Used
* React.js

-----

## Project Name & Pitch

**Studyo**

An platform to boost the interaction between students in untact situation.
Build with React.js, Next.js, Bootstrap, Javascrip and CSS.

## Project Status

This project is almost completed. We are going to add some additional features based on users' requirement.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Development Suite:  

`npm run dev`  

To Visit App:

`localhost:3000/main`  

## Project Screen Shot(s)

Not yet added

[ PRETEND SCREEN SHOT IS HERE ]

[ PRETEND OTHER SCREEN SHOT IS HERE ]

## Project Structure

### Pages

#### `main.js`
Main page containing list of courses that the users are joined.

#### `login.js` `register.js`
Pages for user login & register.

#### `course/[courseid]/index.js`
Course main page containing list of lectures of the course.

#### `course/[courseid]/note/[lectureid]/index.js`
Page containing lecture note & shared notes from classmates. It also supports the upload notes function.

#### `course/[courseid]/quiz/[lectureid]/index.js`
Page with quizzes for review each lecture. This quizzes are made by other classmates' questions.

#### `course/[courseid]/keyword/[lectureid]/index.js`
Page to vote for the keyword of the lecture. The top 3 keywords are displayed in the course main page to for overview of the lectures.

#### `course/[courseid]/question/index.js`
List of the questions uploaded by the current user.

#### `course/[courseid]/question/new.js`
Page for uploading new question.

#### `course/[courseid]/question/[questionid]/index.js`
Page for each question. Containing the details of the question and the answers collected from review quiz page.


### Components

#### `header.js`
Header for all pages. Conatining logo and login.

#### `courseHeader.js`, `lectureHeader.js`
Header for each course/lecture.

#### `answerList.js`, `noteList.js`
Expandable list to display other students' answer for the quiz or note.

#### `pdfViewer.js`
Displaying lecture note pdf file. Built with the `react-pdf` module.
