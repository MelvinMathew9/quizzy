## Quizzy

Quizzy is a full-stack web application for creating, managing, and taking
quizzes. Built with Ruby on Rails, React, and Tailwind CSS, it supports quiz creation, reporting, and more.

---

## Features

- User authentication (login/signup)
- Create, edit, and delete quizzes
- Add questions and options to quizzes
- Take quizzes and submit answers
- View reports and quiz statistics
- Background job processing (Sidekiq)
- Responsive UI with Tailwind CSS

---

## Getting Started

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/MelvinMathew9/quizzy.git
   cd quizzy
   ```
2. Install Ruby gems:
   ```sh
   bundle install
   ```
3. Install JavaScript dependencies:
   ```sh
   yarn install
   ```
4. Set up the database:
   ```sh
   bin/setup
   ```
5. Start the Rails server:
   ```sh
   rails server
   ```
6. Start Webpack dev server (for hot reloading):
   ```sh
   bin/webpack-dev-server
   ```
7. Start Sidekiq (for background jobs):
   ```sh
   bundle exec sidekiq -q reports
   ```

---

## Usage

1. Visit `http://localhost:3000` in your browser.
2. Sign up or log in.
3. Create a new quiz, add questions, and share with users.
4. Take quizzes and view reports.

---

## Technologies Used

- Ruby on Rails
- React
- Webpack
- Tailwind CSS
- Sidekiq (background jobs)
- PostgreSQL/SQLite
- JavaScript (ES6)

---

**Key React Features:**

- Modular components for quizzes, questions, reports, and tables
- API integration for quiz data and user actions
- Dynamic rendering and navigation for quiz-taking
- Responsive design with Tailwind CSS
- Seamless integration with Rails backend
