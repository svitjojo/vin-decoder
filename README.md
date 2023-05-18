# VIN Decoder App
This is a vin decoder app built with React and Redux, using the NHTSA API. Gives you opportunity to decode VIN-code, check history of decoded vin and page with info about vehicle variables<br/>
[DEMO](https://svitjojo.github.io/vin-decoder/)

## Getting Started
### To get started with the project, clone the repository and install the dependencies:

- Copy code
```
git clone https://github.com/svitjojo/vin-decoder.git
```
- Go into folder
```
cd vin-decoder
```
- Install packages
```
npm install
```

### To run the app in development mode:

```
npm start
```
This will start the development server and open the app in your default browser. The app will be available at http://localhost:3000.

### To build the app for production:

```
npm run build
```
This will create a build directory with the optimized production build.

## Project Structure
### The project is organized into several directories:

- components contains the React components used in the app.
- features contains the Redux slicers used in the app.
- api contains the code for fetching data from the NHTSA API.
- public contains static assets used in the app, such as the index.html file and the app icon.

## Technologies Used
- React
- Redux/toolkit
- React Router
