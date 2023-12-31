# the-movie

This web application allows users to browse and discover movies, log in with Firebase Google authentication, manage their favorite movies, and create a watchlist. It uses data from the TMDB API (The Movie Database).

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Demo](#demo)


## Description

This web application allows users to browse and discover movies, log in with Firebase Google authentication, manage their favorite movies, and create a watchlist. It uses data from the TMDB API (The Movie Database).

## Tech Stack

<h4 align="center">Frontend:</h4>
<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react" />
  <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase" alt="firebase" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="javascript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css" />
</p>


<h4 align="center">Deployed On:</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="vercerl">
</p>

## Features

- Firebase Google Login
- Bottom Navigation with three main screens:
  1. Movies (landing screen)
  2. Favourites
  3. Watchlist
- Movies screen with:
  - Movie images, names, and genre/category cards
  - Search functionality
- User-specific Favourites and Watchlist
- Movie details screen with:
  - Movie Banner
  - Name
  - Overview/Description
  - Release Date
  - Genre
  - User ratings/Score (Circular Progress Bar)
  - "Play Now" button with in-app notification
- Logout

## Installation

1. Clone the repository

```bash
git clone https://github.com/khanahmad4527/the-movie.git
```
2. Install dependencies

```bash
npm install
```
3. Start the project

```bash
npm run start
```

## Usage

1. **Log In**: Launch the app, and you will be prompted to log in with your Google account using Firebase authentication.

2. **Navigation**: Navigate through the app using the bottom navigation bar to access three main screens:

   - **Movies**: Browse and discover movies.
   - **Favourites**: Manage your list of favorite movies.
   - **Watchlist**: Create and manage a watchlist of movies to watch later.

3. **Movies Screen**: On the Movies screen, you can:

   - **Browse Movies**: Explore a wide selection of movies.
   - **Search for Movies**: Use the search feature to find specific movies.
   - **Manage Lists**: Add movies to your Favourites or Watchlist.

4. **View Movie Details**: Click on a movie to view its details, including:

   - Movie Banner
   - Name
   - Overview/Description
   - Release Date
   - Genre
   - User ratings/Score (displayed as a Circular Progress Bar)

5. **Play Now**: On the movie details screen, click "Play Now" to receive an in-app notification.

6. **Manage Lists**: In the Favourites and Watchlist screens, you can manage your lists by adding or removing movies as needed.

7. **Log Out**: To log out of the app, click on the "Logout" option.


## Screenshots

<div align="center">
  <h3>Signup Page</h3>
  <img src="https://res.cloudinary.com/dalqx198y/image/upload/v1694351366/Screenshot_467_f8alai.png" width="500">
</div>

<div align="center">
  <h3>Home Page</h3>
  <img src="https://res.cloudinary.com/dalqx198y/image/upload/v1694351367/Screenshot_463_kago83.png" width="500">
</div>

<div align="center">
  <h3>Watchlist page</h3>
  <img src="https://res.cloudinary.com/dalqx198y/image/upload/v1694351367/Screenshot_466_pwlpam.png" width="500">
</div>

<div align="center">
  <h3>Favourite page</h3>
  <img src="https://res.cloudinary.com/dalqx198y/image/upload/v1694351367/Screenshot_465_d6dw0f.png" width="500">
</div>

## Demo

Check out the demo <a href="https://the-movie-nine.vercel.app" target="_blank">here</a>
