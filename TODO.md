# Next steps in the weekly-display branch:

- Change HTML renderer to process CalendarData (for date display) and OvertimeData (for overtime and time data).
- Change SettingsController to provide the right data to HTMLRenderer. Maybe introduce two fields that hold the month and year so they can be used for generating Calendar data *and* as URL params for the Mite API.
- Add daily display to HTML renderer.
