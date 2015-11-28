# Next steps in the reflux branch

- Add store that holds the current date and time and make the ServerConnector use them. Remove them from SettingsView

# Next steps in the weekly-display branch:

- Use envify to check for debugging variable to use different real API or test JSON
- Delete DailyOvertimeCalculator: No longer needed and used
- Add two fields to SettingsController that hold the month and year so they can be used for generating Calendar data *and* as URL params for the Mite API.
- Add daily display to HTML renderer.
