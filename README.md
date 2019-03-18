# HealthCatalyst

The program is made under Visual Studio 2017 using Angular 7 and ASP.NET Core 2.2. The software consist of a site where you enter or generate new patients and then can search for them in a localy store database that is SQLite 3.0.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to make sure you have the following softwares installed:
* [Visual Studio 2017](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=15&rid=35000#) - Community Edition of Visual Studio 2017 (You can use other versions)
* [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download/thank-you/dotnet-sdk-2.2.105-windows-x64-installer) - Visual Studio Solution is under that version and since its new most people need to install it first before using the project.
* [Node.js and NPM](https://nodejs.org/dist/v11.12.0/node-v11.12.0-x64.msi) - Latest copy of Node.js and NPM

### Installing

* Once you have installed the perequisites download a copy of this repository on a local folder and open the HealthCatalyst Solution file (HealthCatalyst.sln).
* Now open command prompt in your Windows system and change directory to the HealthCatalyst project where the folder ClientApp is located.

```
c:\>cd [root]\HealthCatalyst\HealhtCatalyst
```

* Now that you are in the Angular project main directory type in the following and click enter (Will take a long time as its downloading all the dependent packages for the Angular project)

```
c:\[root]\HealthCatalyst\HealhtCatalyst>npm install
```

## Running Solution Different parts

The solution is composed of different actors like the FrontEnd, API Document Site (Swagger), ASP.NET WebAPI, .NET Unit Test Project and Karma Angular Unit Test site, 

### Running Front End

Go to Visual Studio 2017 and run Web Project call HealthCatalyst in any browser install in your computer. This will start the Angular and ASP.NET WebApi hosting automatically. The internet browser will load on http://localhost:8841/

### Running API Documentation site

When the application is running go to http://localhost:8841/swagger and you will see all the available API calls exposed in ASP.net WebApi.

### Running Business Layer Unit Test

Under the Visual Studio 2017 Solution go to project HealthCatalyst.Test -> File PatientTests.cs and open the file. Under this file right click and hit Run Test where the class declaration is at.

### Running Front Ent Unit Test

* Open command prompt in your Windows system and change directory to the HealthCatalyst project where the folder ClientApp is located.

```
c:\>cd [root]\HealthCatalyst\HealhtCatalyst
```

* Now that you are in the Angular project main directory type in the following and click enter

```
c:\[root]\HealthCatalyst\HealhtCatalyst>ng test
```

* Now the Karma Unit Test website will load on your internet browser to http://localhost:9876/?id=51278139
* All unit test that were composed for all Angular components of the application and a report will show the outcome.

## Using Application

The application is composed of several bottoms and actions to input patients and search for patients. The following are the different activities you an perform on the application Front End UI.

### Add New Patient

Click on "Add Patient" button and a Modal will come up to tell you to fill out a form with all the needed details for a patient. Once the data is enter click the Add button and you will be taken back to the main page and shown a notification if you patient was successfully added.

### Generate New Patient

As part of making the process of creating a new patient very easy a function that calls several public apis and grabs data was implemented.
Click on "Generate Patient" button you will see a spinner shown and eventually a notification stating that such patient was added.

### Generate Bad Patient

In order to show that the WebAPI of the application can report errors a button was added to push bad data on purpose.
Click on "Generate Bad Patient" button you will see a spinner shown and eventually a notification stating that an error has occurred as part of the operation.

### Search For Patient

In order to search for all the patients that you have added you want to go to the top left and type in the search criteria of the patient you are looking for in the Search Box.
You can type a portion or one letter of the patient and it will match any part of its last or first name base on the input criteria.

### Viewing The Patient Info

As part of the actual patient you will be able to see its Name and Photo. To look at more information about that patient click the dropdown selection "More Info" and the information will show up.
To browse for more patients just scroll down in page and those patients will keep loading up.
