# Next steps in react branch
- Check for errors when logging in - what happens to the form
- use Real server API instead of dummy server API
- Write tests
- Squash commits / change WIP in react commit

# Planned UI/UX improvements
- Show spinning indicators in login form while it's being sent to server

# Next steps:
- Fix control flow: No server requests and display of time data until credentials have been entered. Show login state in main content area until login is successful.
- Fix pagination error: After navigating away from current month you can't navigate back.
- Add German holidays.
- Add daily overtime decorator
- Add daily display to HTML renderer. Render days as a 3-column table (Day, hours, total) below each week. Use different colors for holidays and days from other months.
- Change Reject in ServerAPI to throw proper errors? Not until we can subclass Error in babel properly.
- Store configuration data in localStorage, "logout" cleans it. Separate settings and credentials (both visually and in the data store). Show/hide settings and login panel as needed.
- Refactor CalendarGenerator to generate domain objects, refactor EntriesToDaysConverter to EntriesToDaysDecorator, simplify EntriesStore and HTML renderer to use the new singular data structure.
- Check earliest date to avoid navigating to empty months
- Add history for pagination (back button in browser).
- Calculate yearly overtime (with offset from previous year), to see you current "balance".
- Add date range view (4 weeks or date entry), all days in range are counted. For date ranges > 1 year, the weeks calculated in `OvertimeFactory` need to be stored with different keys (year-weekNumber instead of weekNumber)
- Track/mark special entries ( sick days, vacation) in the time data and display it
- Add different webpack configuration for building the app: minify, no debug information.
- Graphical "hedgehog" display of overtime ( arcs with the same angle for days/weeks in a month and different radii, depending on overtime/undertime)
- Prettier design
- Load & cache entries in the background
