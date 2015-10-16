# Mite Overtime Tracker

This JavaScript application calculates the overtime of a month, using data from the time tracker Mite (http://mite.yo.lk).

## Usage

To use this application you need two pieces of information: your **Mite account name** and your **API key**. The account name is the last bit of your Mite URL, e.g. if you access Mite normally via https://wmd.mite.yo.lk, then your account name is `wmd`. Your API key can be found on the Mite user account page. You can go to the Mite account page by clicking on your name in the top right corner of the Mite page after you logged in to Mite. 

Enter the credentials in the fields and press the "Check" button. You will be presented with the overtime amounts for the current month.

### How is the overtime calculated?

At the moment the calculation is day-based: For every day that has one or more entries in Mite, the hours worked on that day are compared against the hours per workday. This works great if you do mostly 9-5 work on specific days, some days more, some days less than the configured hours per workday. 

**Warning:** The current counting method will lead to *missing time* if you spread out a 40-hour workweek to the weekend or work some hours overtime on the weekend or holdidays!!!

In the next version the counting method will be workweek-based instead of workday-based and take weekends and German holidays into account. 


## Installation

Normally, this application is hosted on a web server so you don't have to install anything.

If you want to host your own version of the application, the JavaScript files have to be compiled. For the compilation process you need a Node.js environment. You can download and install Node from https://nodejs.org.

To build the Javascript, download this repository, go to the folder on the command line and run the following commands:

	npm install
	npm build

Now you can copy the contents of the `web` folder to your web server and use it there. Alternatively, you can run

	npm start

to start a web server on you local machine. You can then use the application with the URL http://localhost:8080/

## FAQ

### What about data security? Will the government and everybody else on my network read all my timesheet entries?
The data is queried directly from the Mite API and is protected with SSL encryption. For more security, place the web app on an SSL-protected web server.

### Why is the D3 framework used instead of a templating or component framework?
I plan to do a nice visualization of the overtime data instead of rendering HTML. The HTML is only a stopgap measure until I found time for prettier display options.






