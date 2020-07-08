# News Reader

An introduction to GraphQl and Apollo following [this](https://www.youtube.com/watch?v=wcBvRQ_kpzM&t=62s) tutorial.
React application using Apollo Server and GraphQl to render news articles from Hacker news API and New York Times API.
GraphQL and Apollo server allows React app to render results from two APIs using a single endpont

### Key features:
* User can view stories Hacker news API and New York Times API
* Infinite Scroll to load 30 articles incrementally on scroll.

### Running Instructions

* Install dependencies of application
  Install server dependencies
  ```
    cd server
    yarn
    // wait for dependencies to install
    cd ..
  ```

  Install client dependencies
  ```
    cd client
    yarn
    // wait for dependencies to install
    cd ..
  ```

* Run the two servers
  Run server dependencies
  ```
    cd server
    yarn start
    cd ..
  ```

  Install client dependencies
  ```
    cd client
    yarn start
    cd ..
  ```
  