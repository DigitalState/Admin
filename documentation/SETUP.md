## Prerequisites
 - The Authentication MS running on [http://locahost:8010]() and must have migrations applied and fixtures loaded.
 - The Services MS running on [http://locahost:8051]() and must have migrations applied and fixtures loaded.
 - Camunda and Formio running on whatever hosts/ports configured on the Services MS which currently defaults to (Camunda: [http://172.17.0.1:8055]() and Formio: [http://45.79.141.45:8056]())
 - The Camunda BPMN file must have a start event with a form key formatted as follows: `formio:pay-taxes`.

## Run
Run the Admin Angular app as described in [README.md](README.md). 

## Workflow
 - [Login](http://localhost:3000/#/login) with one of the preloaded users or [Register](http://localhost:3000/#/register) a new user.
 - Click the [Services](http://localhost:3000/#/pages/services/list) link in the sidebar to list all Services.
 - Click the "Show" button of "Pay Your Taxes" Service.
 - Click the "Scenarios" button on the toolbar.
 - Create a Scenario by clicking "Create".
 - Fill up the form and make sure the Data field has the proper `process_definition_key` then save the scnario.
 - Click the "Show" button of the newly created Scenario.
 - Click "Activate".
 - Fill up the Formio form and submit. 
 - Upon success, the response with Submission details should be displayed on a popup and a new process instance should be activated.
 