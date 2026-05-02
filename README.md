# maternal-health-interface-6440
Maternal Health Interface Project for CS 6440 Spring 2026

## Tools/Technology
We created an application that allows our users to interact with their EHR in an easy accessible way. We used Figma to design the screen mock-ups for our UI. 
This is the list of tools that we used to build the app: 
- React
- Tailwind css
- LLM API (OpenRouter)
- SMART on FHIR
- HAPI FHIR
- Typescript

## Datasets and Data Sources
We used the sample FHIR servers given to us for the labs. On top of these sample servers given to us, we also plan on using a small set of sample data to showcase the use case of our app. We created a sample user and filled in their data to showcase how we can view and change their EHR.

## Architecture Diagram
The architecture for our application centers around a patient-facing interface. The main idea for our app is to allow the user to keep their EHR medical information updated frequently without needing to directly interface with the database, which is done by using a patient dashboard where users can report their weekly issues or symptoms. The users self-report their status through their dashboard, and the app will record new observations into the FHIR database. The patient's EHR can also be accessed by the app, which the user can choose to see their medical information through their dashboard. Additionally, an LLM layer sits between the frontend and the backend to interpret qualitative check-in data and provide conversational summaries directly to the patient.

![ArchitectureDiagram](./images/img1)

## Screen Mock-ups
Below are the two main screens for our application. We plan on creating two tabs: one for our Dashboard where patients can see an overview of their health alongside their todos, and another for a check-in form that allows patients to self-report their current health situation. The Dashboard will consist of multiple parts, which we may expand on throughout the development of our app. For now, we have the Care Plan, which gives users reminders of what they should do, the Vital Trends, which gives a visual of their vitals, and finally the Timeline, which allows users to see individual reports and incidents. The other tab, the Check-in Form, is where users can directly give their own health status to the application to be recorded. The questions themselves aren’t solidified yet, but the general idea is to have both concrete questions and general questions. The concrete questions will be quantitative in nature, such as heart rate, and the general questions will be qualitative and can be interpreted by an LLM to be put into a form that can be inputted into the FHIR servers.

![Screenmockup1](./images/img2)
![Screenmockup2](./images/img3)