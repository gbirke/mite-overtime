# Next steps in the reflux branch

- Refactor OvertimeCalculator and ServerConnector as Services/Stores (new directory "services") that listen to settings actions. This makes the data flow more explicit.
- Create ErrorView with error handling code from SettingsController
- Move SettingsController code to SettingsView (view just handles the user events)
- Add unit tests for events/handlers

# Next steps in the weekly-display branch:

- Use envify to check for debugging variable to use different real API or test JSON
- Add two fields to SettingsController that hold the month and year so they can be used for generating Calendar data *and* as URL params for the Mite API.
- Add daily display to HTML renderer.
