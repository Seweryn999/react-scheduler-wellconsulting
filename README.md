# My Scheduler Application

A React-based event scheduler application that allows users to create, edit, and delete events. The application leverages Firebase for data persistence and Material-UI for the UI components. This project was written for recruitment to WellConsulting and is alive at:  
[React Scheduler for WellConsulting](https://seweryn999.github.io/react-scheduler-wellconsulting/).

## Features
- **Event Management:** Add, edit, and delete events.
- **Scheduler Views:** View events by day, week, or month.
- **Persistent State:** The current view and date are saved in local storage.
- **Localization:** Uses Polish (`pl`) locale for date and time formatting.
- **Firebase Integration:** Stores events in a Firestore database for real-time updates.

---

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   cd your-repository-folder


2. Install dependencies:

bash
npm install
Set up Firebase:

Create a Firebase project at Firebase Console.
Add a Firestore database and create a collection named wydarzenia.
Configure the firebaseConfig.js file with your Firebase project's credentials.
Start the development server:

bash
npm start
The app should now be running at http://localhost:3000.

## Usage
Basic Actions:
Add Event: Click the "Add" button in the toolbar to add a new event.
Edit Event: Select an event in the scheduler and click "Edit".
Delete Event: Select an event and click "Delete".
Navigation:
Navigate Dates: Use the date navigation buttons in the toolbar to move forward or backward by day.
Change Views: Switch between different views (e.g., day, week, month) using the view selector.
Data Persistence:
All events are saved to the Firestore database in real time.
The current view and date are saved to local storage to ensure the same view is loaded on a page refresh.
Project Structure
plaintext

