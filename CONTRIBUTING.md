# Contributing

Only JavaScript scripts are accepted. To add a new script create a new `.js` file in the scripts folder. The format of the script _must_ have the help text documentation. 

## Checklist:

- [ ] Has help text documentation
- [ ] Uses promises (NO CALLBACKS)
- [ ] Only uses `catch` for promises at the _top most_ layer or whenever you can handle the error
- [ ] uses `request-promise-native` for http requests
- [ ] uses cache where necessary
- [ ] No large nested objects of functions
- [ ] JSDoc for functions that are used as helper functions
- [ ] module.exports should be small and defer to another function

## Example

See [scripts/athf.js](scripts/athf.js). 