MovieExplorer

MovieExplorer is a single-page application (SPA) built with React that allows users to browse, search, and discover movies (using TV show data from the TVMaze API for demonstration). Users can view movie details, filter by genre, add movies to a favorites list, and navigate between pages using React Router. The app features a responsive design with a dark/light mode toggle and persists favorites using localStorage.

Features





Browse Movies: View a list of movies fetched from the TVMaze API.



Search Movies: Search movies by title using a dynamic search bar.



Filter by Genre: Filter the movie list by selecting a genre from a dropdown.



Favorites Management: Add or remove movies from a favorites list, persisted in localStorage.



Routing: Navigate between:





Home (/): Displays the movie list with search and filter options.



Movie Details (/movie/:id): Shows detailed information about a selected movie.



Favorites (/favorites): Lists all favorited movies.



Dark/Light Mode: Toggle between dark and light themes for better user experience.



Responsive Design: Optimized for both desktop and mobile devices using Tailwind CSS.

Technologies





React: JavaScript library for building the user interface.



React Router: For client-side routing between pages.



Tailwind CSS: For responsive and modern styling.



TVMaze API: Provides mock movie data (TV shows used as movies).



LocalStorage: Persists favorite movies across sessions.



CDN: React, React Router, and Tailwind CSS are loaded via CDN for simplicity.

Installation

Prerequisites





A modern web browser (e.g., Chrome, Firefox).



A code editor like VS Code (optional for development).



No server-side setup is required since the app runs entirely in the browser via CDN.

Steps





Clone the Repository:

git clone https://github.com/pshemssa/MovieExplorer.git
cd MovieExplorer



Open the Application:





Open index.html in a web browser (e.g., double-click the file or use a local server).



Alternatively, serve the project using a local development server:

npx serve

Then navigate to http://localhost:5173 (port may vary).



Optional: Make Changes: 





If you modify the code, ensure you have a JavaScript-enabled browser to render the React app.



No additional dependencies are required since all libraries are loaded via CDN.

Usage





Home Page: Browse the movie list, use the search bar to find movies by title, or select a genre to filter the list.



Movie Details: Click "View Details" on a movie card to see more information (e.g., summary, genres, rating).



Favorites Page: View your favorited movies or remove them from the list.



Dark/Light Mode: Use the toggle button in the navbar to switch themes.

File Structure

/MovieExplorer
├── index.html         # Main HTML file with React app
├── README.md          # Project documentation

Note: The app is contained in a single index.html file for simplicity, with all components, hooks, and utilities embedded using JSX and CDN imports.