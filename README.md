
# Project Title

A simple sheet utility to extract table and chart images and run them through a webhook url.
## Quick start
To get setup quickly, create a new empty google sheet.

- after that go to the app script panel and create a new file called exporter.
- Copy all the contents of the build.js over into the newly created exporter.gs
- After that you can follow the project configuration setup below.


## Project configuration

1. Create a simple table in your sheet like the image below
![App Screenshot]([https://user-images.githubusercontent.com/744973/54870967-a9135780-4d6a-11e9-991c-9f57a508bdf0.gif](https://github.com/seaszn/sheets-discord-capture/blob/main/images/Screenshot%202024-08-08%20141616.png?raw=true))


2. In the header of the table, enter the following formula:

```excel
=captureConfig(A3:B3)
```
The range notation can be customized to include all the configurations below. Ensure there are no empty rows in the table.

3. Fill in the columns as follows:
- Configure the name of the table yourself.
- For the range column, enter the following formula and replace the range with your desired range:

4. If everything is correct, you should see something like this:
![App Screenshot](https://user-images.githubusercontent.com/744973/54870967-a9135780-4d6a-11e9-991c-9f57a508bdf0.gif)


### Running the Export Function
After setting up the sheet, you can call the exportSheetMedia function either within the script or from the trigger page.



## Development setup
- Download the Node.js installer from the [official website](https://nodejs.org/).
- Run the installer and follow the setup instructions.
- Verify the installation by running the following commands in your terminal:

```bash
node -v
npm -v
```


### Google Clasp
- Create a new Google Apps Script project:

```bash
clasp create
```

- Select the sheets project type when prompted. This will create a new Google Sheets project in the root folder of your drive.
- Install the necessary dependencies:

## Building the project
- Deploy the project by running
```bash
npm install
```
- after that deploy the project using
```bash
npm run deploy
```

If successful, there should now be a dist/bundle.gs file in your app script project of the sheet.

## Configurate Commands
- Create a new file in the app script project called commands.gs and copy all the contents of the command.js file over into that file.
- Go to the script properties and set the WEBHOOK_URL property to your webhook URL.


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

