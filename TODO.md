# Next steps in the domain-objects branch

**Goal**: Instead of passing around some fluffy JSON structure that has to be deciphered and documented, create domain objects for calculating the work times.

- Create OvertimeFactory for getting an n objects that creates decorated month and week objects from Mite entries
- Use OvertimeFactory as a parameter in entry store ( instead of OvertimeCalculator )
- Add cutoff date to decorators to stop calculating time for dates after current day
- Display week dates ( a bit smaller than the week numbers)
- Remove unused classes and their tests: `DefaultObject`, `TotalsObjectAggregator`, `WeeklyOvertimeCalculator`, `TimeAggregator`
- Continue working on weekly-display branch

# Next steps in the weekly-display branch:
- Add ability to exclude overtime compensation entries. Don't add overtime compensation to the total.
- Merge to master

# Next steps in new branch
- Add daily display to HTML renderer. Render days as a 3-column table (Day, hours, total) below each week
- Track/mark special entries ( sick days, vacation) in the time data and display it
- Graphical "hedgehog" display of overtime ( arcs with the same angle for days/weeks in a month and different radii, depending on overtime/undertime)
- Ability to display time range instead of month