# Next steps in the domain-objects branch

**Goal**: 
- Instead of passing around some fluffy JSON structure that has to be deciphered and documented, create domain objects for calculating the work times.
- Accomodate the new overtime rules with different hierarchical calculation models:
  - Monthly view, only days in weeks belonging to the month are counted (as before)
  - Date range view, all days in range are counted

- Create OvertimeFactory for getting an object that creates decorated month and week objects from Mite entries
- Use DayFilter.before in OvertimeFactory to stop calculating time for dates after current day.
- Use OvertimeFactory as a parameter in entry store ( instead of OvertimeCalculator )
- Display missing timeDelta values in HTML renderer as 0, do not fail if their're missing
- Display week dates ( a bit smaller than the week numbers)
- Remove unused classes and their tests: `DefaultObject`, `TotalsObjectAggregator`, `WeeklyOvertimeCalculator`, `TimeAggregator`
- Continue working on weekly-display branch

# Next steps in the weekly-display branch:
- Add ability to exclude overtime compensation entries. Don't add overtime compensation to the total.
- Merge to master

# Next steps in new branches
- Maybe Refactor weekly and monthly overtimedecorators?
    - Weekly should show the week, without filtering by month.
    - Monthly should show the total by month, with which excludes time from neighboring months
- Add daily overtime decorator
- Add daily display to HTML renderer. Render days as a 3-column table (Day, hours, total) below each week
- Track/mark special entries ( sick days, vacation) in the time data and display it
- Refactor CalendarGenerator to generate domain objects, refactor EntriesToDaysConverter to EntriesToDaysDecorator, simplify EntriesStore andÂ´HTML renderer to use the new singular data structure.
- Graphical "hedgehog" display of overtime ( arcs with the same angle for days/weeks in a month and different radii, depending on overtime/undertime)
- Ability to display time range instead of month
- Refactor to use Redux instead of Reflux
