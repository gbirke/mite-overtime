# Next steps in the domain-objects branch:

- Instead of passing around some fluffy JSON structure that has to be deciphered and documented, create domain objects for calculating the work times.
- Refactor WeeklyWorkTimeCalculator to calculate only the weekly worktime (ignore daily for the moment)
- Refactor HTML renderer to use new data structure
- Display week dates ( a bit smaller than the week numbers)
- Continue working on weekly-display branch

# Next steps in the weekly-display branch:

- Add ability to exclude overtime compensation entries. Don't add overtime compensation to the total.
- Don't calculate/show totals/missing time for dates after current day
- Merge to master

# Next steps in new branch
- Add daily display to HTML renderer. Render days as a 3-column table (Day, hours, total) below each week
- Track/mark special entries ( sick days, vacation) in the time data and display it
- Graphical "hedgehog" display of overtime ( arcs with the same angle for days/weeks in a month and different radii, depending on overtime/undertime)
- Ability to display time range instead of month