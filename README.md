# Mite Overtime Tracker

This JavaScript application calculates the overtime of a month, using data from the time tracker Mite (http://mite.yo.lk).

## Usage

To use this application you need two pieces of information: your **Mite account name** and your **API key**. The account name is the last bit of your Mite URL, e.g. if you access Mite normally via https://wmd.mite.yo.lk, then your account name is `wmd`. Your API key can be found on the Mite user account page. You can go to the Mite account page by clicking on your name in the top right corner of the Mite page after you logged in to Mite. 

Enter the credentials in the fields and press the "Login" button. You will be presented with the overtime amounts for the current month. The times shown are hours and minutes.

### How is the overtime calculated?

Based on the hours per week (configurable in "Settings" after you logged in), the required worktime for each day and each week in a month is calculated. This is compared to the Mite entries for each day.

If the week starts in one month and ends in another, only the overtime for the days inside the currently displayed month is calculated.

**The calculation of working days for each week is fixed to the 'Berlin, Germany' locale!** That means that German holidays (as they are defined for the county 'Berlin') don't count as required working days.
  

## Installation

Normally, this application is hosted on a web server so you don't have to install anything.

If you want to host your own version of the application, the JavaScript files have to be compiled. For the compilation process you need a Node.js environment. You can download and install Node from https://nodejs.org.

To build the Javascript, download this repository, go to the folder on the command line and run the following commands:

	npm install
	npm run build

Now you can copy the contents of the `web` folder to your web server and use it there. 

### Running in development mode
If you want to run the application in development mode (where you don't need a Mite API), run

	npm start

to start a web server on you local machine. You can then use the application with the URL http://localhost:8080/ For the server request to work, you either have to change `js/config/development` or download some data from your mite account with the following commands:

    curl  -H 'X-MiteApiKey: YOUR_API_KEY'  https://wmd.mite.yo.lk/myself.json > web/myself.json
    curl  -H 'X-MiteApiKey: YOUR_API_KEY'  https://wmd.mite.yo.lk/time_entries.json > web/time_entries.json


## FAQ

### What about data security? Will the government and everybody else on my network read all my timesheet entries?
The data is queried directly from the Mite API and is protected with SSL encryption. For more security, place the web app on an SSL-protected web server.

### Why is the D3 framework used for rendering the overtime?
Historical reasons: I planned to do a nice visualization of the overtime data and wanted to have the same rendering "API" both for HTML and the SVG graph. I did the HTML first. Then the visualization got pushed very low down on the todo list. Rewriting it in React would be nice but there is so much other stuff to do.

### What's with the `views` folder?
The folder contains jQuery-based views that were used before I switched the view part of tge application to React. Since I was totally out of my depth with this new framework I kind of "fiddled" the application together until it displayed what I wanted. Thus, I have no unit tests for my components at this time. I keep the `test/views` folder to remind me of the expected behavior of the views. They will be the basis of the units tests for the components. I keep the `views` folder to make the old tests pass.   





