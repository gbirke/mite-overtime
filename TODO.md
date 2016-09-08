# Next steps:
- Calculate yearly overtime with offset from previous year and an optional starting month for people who started working not from January. Calculate current "balance". To avoid transmitting lots of data from Mite and needing to do calculations, use the `Workweek` object to calculate the required number of hours in a date range and get the data from Mite grouped by year.
- Add daily overtime decorator
- Add daily display to HTML renderer. Render days as a 3-column table (Day, hours, total) below each week. Use different colors for holidays and days from other months.
- Change Reject in ServerAPI to throw proper errors? Not until we can subclass Error in babel properly.
- Pre-render HTML index.html when building so user does not see empty page.
- Check earliest date to avoid navigating to empty months
- Add history for pagination (back button in browser).
- Track/mark special entries ( sick days, vacation) in the time data and display it
- Graphical "hedgehog" display of overtime ( arcs with the same angle for days/weeks in a month and different radii, depending on overtime/undertime)
- Display user name by querying `myself.json` 
- Render HTML overtime with React instead of D3.
- Add date range view (4 weeks or date entry), all days in range are counted. For date ranges > 1 year, the weeks calculated in `OvertimeFactory` need to be stored with different keys (year-weekNumber instead of weekNumber)
- Prettier design
- Load & cache entries in the background: Load current date on start, load next 12 months when paginating.
- Make holidays configurable in settings by selecting locale and locale-dependent qualifier. Some locales might have regional holidays (like German counties) or allowances for special religions, that are not covered by locale.
- I18N: Make all strings translatable.

# Planned UI/UX improvements
- Add help button and overlay to menu. 
- Explain how to get the API key with an animated GIF. Display the GIF on the login page.
- Show overtime in green and missing time in red.
- Show "No entries for Month X" when there are no entries for month x.
- Show weeks in the future empty instead of '0:00' missing.
- Change routing URL to have human-readable month names instead of 1-digit, zero-based month number.
- Show spinning indicators in login form while it's being sent to server
- Try to distinguish between genuine login errors (check value of ServerApi.checkCredentials Promise reject) and HTTP errors.
- Add "Remember me" function (with warning that it's unsafe to do that because it stores the API key locally).

# Planned code quality improvements
- Write test for date reducer to test "Don't go over current month" functionality.
- Write tests for components and sagas
- Write test for server api loadEntries and params
- Remove views folder and tests. They're made obsolete by the React components but are kept as a reminder what should be tested. Remove jQuery dependency
- Document how Mite entry objects are converted to Day objects and how days get processed to weeks and months by decorators 
- Refactor decorators and OvertimeFactory to ECMAScript2015 and a more functional style where possible.
