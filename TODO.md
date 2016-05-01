# Next steps in the domain-objects branch

**Goal**: 
- Instead of passing around some fluffy JSON structure that has to be deciphered and documented, create domain objects for calculating the work times.
- Accomodate the new overtime rules with different hierarchical calculation models:
  - Monthly view, only days in weeks belonging to the month are counted (as before)
  - Date range view, all days in range are counted (will be implemented later)

- Display missing timeDelta values in HTML renderer as 0, do not fail if their're missing
- Display week dates ( a bit smaller than the week numbers)
- React to changes when hours per week is changed (Regenerate entries domain objects with without requesting entries again)
- Continue working on weekly-display branch

# Next steps in the weekly-display branch:
- Add ability to exclude overtime compensation entries. Don't add overtime compensation to the total.
- Update README
- Merge to master

# Next steps in new branches
- Add daily overtime decorator
- Add daily display to HTML renderer. Render days as a 3-column table (Day, hours, total) below each week
- Add date range view (4 weeks),
- Track/mark special entries ( sick days, vacation) in the time data and display it
- Refactor CalendarGenerator to generate domain objects, refactor EntriesToDaysConverter to EntriesToDaysDecorator, simplify EntriesStore and HTML renderer to use the new singular data structure.
- Graphical "hedgehog" display of overtime ( arcs with the same angle for days/weeks in a month and different radii, depending on overtime/undertime)
- Refactor to use Redux instead of Reflux
- Use ES6 and babel/webpack instead of browserify
