# Next steps:
- Add German holidays.
- Test if build to gh-pages still works.
- Use [envlist](https://www.npmjs.com/package/envlist) to translate between APP_ENV and NODE_ENV.
- User always has to enter hours per week after login - store settings data in localStorage.
- Calculate yearly overtime with offset from previous year and an optional starting month for people who started working not from January. Calculate current "balance". To avoid transmitting lots of data from Mite and needing to do calculations, use the `Workweek` object to calculate the required number of hours in a date range and get the data from Mite grouped by year.
- Add daily overtime decorator
- Add daily display to HTML renderer. Render days as a 3-column table (Day, hours, total) below each week. Use different colors for holidays and days from other months.
- Change Reject in ServerAPI to throw proper errors? Not until we can subclass Error in babel properly.
- Pre-render HTML index.html when building so user does not see empty page.
- Check earliest date to avoid navigating to empty months
- Add history for pagination (back button in browser).
- Track/mark special entries ( sick days, vacation) in the time data and display it
- Add different webpack configuration for building the app: minify, no debug information.
- Graphical "hedgehog" display of overtime ( arcs with the same angle for days/weeks in a month and different radii, depending on overtime/undertime)
- Render HTML overtime with React instead of D3.
- Add date range view (4 weeks or date entry), all days in range are counted. For date ranges > 1 year, the weeks calculated in `OvertimeFactory` need to be stored with different keys (year-weekNumber instead of weekNumber)
- Prettier design
- Load & cache entries in the background: Load current date on start, load next 12 months when paginating.

# Planned UI/UX improvements
- Show overtime in green and missing time in red.
- Show "No entries for Month X" when there are no entries for month x.
- Show spinning indicators in login form while it's being sent to server
- Try to distinguish between genuine login errors (check value of ServerApi.checkCredentials Promise reject) and HTTP errors.

# Planned code quality improvements
- Write test for date reducer to test "Don't go over current month" functionality.
- Write tests for components and sagas
- Write test for server api loadEntries and params
- Remove views folder and tests. They're made obsolete by the React components but are kept as a reminder what should be tested.
- Document how Mite entry objects are converted to Day objects and how days get processed to weeks and months by decorators 
- Refactor CalendarGenerator to generate domain objects, refactor EntriesToDaysConverter to EntriesToDaysDecorator, simplify EntriesStore and HTML renderer to use the new singular data structure.