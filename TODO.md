# Next steps in the reflux branch

- Move SettingsController code to SettingsView (view just handles the user events)
- Add unit tests for events/handlers

# Next steps in the weekly-display branch:

- Use envify to check for debugging variable to use different real API or test JSON
- Delete DailyOvertimeCalculator: No longer needed and used
- Add two fields to SettingsController that hold the month and year so they can be used for generating Calendar data *and* as URL params for the Mite API.
- Add daily display to HTML renderer.
