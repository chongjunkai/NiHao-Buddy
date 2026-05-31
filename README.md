# NiHao Buddy 🇨🇳📚

### My First AI-Assisted Educational Technology Project

## Project Overview

NiHao Buddy is an experimental Chinese learning application inspired by my own learning journey.

I enjoy technology, coding, and building things, but I found Chinese more challenging than some of my other subjects. My mum noticed this and encouraged me to think about how technology could make Chinese learning more effective and enjoyable.

Together, we brainstormed ideas for a Chinese learning app that could help not only me, but also my younger sister and other students who may struggle with Chinese.

This became my first AI-assisted software development project and my introduction to using technology to solve real learning problems.

---

## How the Idea Started

Many students find Chinese difficult because learning vocabulary can feel repetitive and sometimes less engaging.

My mum and I discussed what makes games enjoyable and what helps people remember information better. We wondered if learning Chinese could be made more fun through technology.

We came up with ideas such as:

- Interactive quizzes
- Flashcards
- Rewards and achievements
- Learning streaks
- Progress tracking
- Audio pronunciation support
- Vocabulary stories
- Personalised review based on mistakes
- Fun challenges and mini-games

We then explored whether these ideas could be combined into a learning app that makes Chinese practice more engaging and motivating.

---

## Project Vision

The long-term vision of NiHao Buddy is to create a learning companion that helps students:

- Build Chinese vocabulary confidently
- Review words more effectively
- Learn through games and challenges
- Stay motivated through rewards and achievements
- Practice pronunciation and pinyin
- Learn from their mistakes
- Develop consistent learning habits

The goal is not only to teach Chinese, but also to make learning feel enjoyable and rewarding.

---

## Current Local App

The current local version is a working Flask + HTML/CSS/JavaScript app. It can be run on a computer and used in the browser.

Implemented features include:

- P1-P6 Singapore primary Chinese character lists
- Flashcard-style learning by grade and lesson
- Pinyin generated for each character
- 好词 and 好句 helpers for remembering characters
- Browser speech pronunciation using the Web Speech API
- External sound links through Google Translate when extra audio support is needed
- Quiz practice with points and streaks
- Rewards, badges, and progress tracking in browser local storage
- Personal saved-word collection
- Mistake review and recommended revision list
- 30-second speed challenge mini-game
- Search by character, pinyin, lesson, 好词, or 好句
- Simple local API for grades and words

---

## How To Run Locally

```bash
cd /path/to/NiHao-Buddy
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python backend/app.py
```

Then open:

```text
http://127.0.0.1:5000/
```

The app rebuilds the local SQLite vocabulary database from the CSV files when the Flask server starts.

---

## Project Data

Vocabulary data is stored in CSV files:

- `data/grade1.csv`
- `data/grade2.csv`
- `data/grade3.csv`
- `data/grade4.csv`
- `data/grade5.csv`
- `data/grade6.csv`

The app enriches each character with pinyin, 好词, 好句, and sound links at runtime.

---

## Future Ideas

### Learning Features

- More carefully hand-curated 好词好句 for every character
- Confusing-character comparison
- Spaced repetition scheduling
- Story practice using saved or mistaken words

### Gamification Features

- Progress levels
- Unlockable content
- Learning challenges
- More mini-games based on vocabulary learning

### Personalised Learning

- Spaced repetition review
- Personal learning statistics

### Creative Features

- Vocabulary stories
- Interactive learning adventures
- Character-based rewards
- Story-based revision activities

### Family Learning

- Multiple user profiles
- Shared family learning progress
- Parent support tools

---

## Technologies Explored

- HTML
- CSS
- JavaScript
- Python
- Flask
- SQLite
- pypinyin
- jieba
- ChatGPT and AI-assisted development tools

---

## My Development Process

I used ChatGPT extensively throughout the project.

AI helped generate code, suggest features, and explore possible solutions.

My role included:

- Identifying the learning problem
- Brainstorming ideas with my mum
- Planning features
- Testing the application
- Evaluating AI-generated solutions
- Improving the user experience
- Learning how software projects are built

This project taught me that building useful software requires much more than writing code. It also involves understanding users, solving problems, and continuously improving ideas.

---

## What I Learned

Through this project, I learned:

- How software projects begin with real-world problems
- How AI can assist software development
- How difficult it is to turn ideas into working products
- The importance of testing and iteration
- How educational technology can help learners
- How large projects can become more complex over time

Most importantly, I learned that even unfinished projects can teach valuable lessons.

---

## Current Status

Working local demo

NiHao Buddy is still an ongoing learning project, but the current version is usable as a local demo.

Some advanced ideas, such as multiple user profiles, handwriting recognition, and full spaced repetition scheduling, are not implemented yet.

It continues to inspire many of my later coding projects and experiments.

---

## Acknowledgement

Special thanks to my mum for brainstorming ideas, providing feedback, encouraging experimentation, and helping shape the vision behind this project.

This project reflects our shared belief that learning can be more effective when it is engaging, interactive, and enjoyable.
