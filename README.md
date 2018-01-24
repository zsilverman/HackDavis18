# &Finder (Address Finder)
Built in 24 hours at HackDavis 2018

## Navigating our Codebase
[finder-rn](https://github.com/zsilverman/HackDavis18/tree/master/finder-rn) is the backend mobile app written in React-Native using Firebase database

[finder](https://github.com/zsilverman/HackDavis18/tree/master/finder) is the front-end React Dispatch Dashboard utilizing Google Maps API

## What it is
Our mobile app allows callers to press a button and be instantly connected to a dispatcher displaying in real time on a map GPS location and medical history. The Dispatch Dashboard allows dispatchers to determine the best response to the situation by sending EMS, police, and/or Fire Department. In time critical circumstances, the portal allows for the dispatcher to send videos immediately to the caller's device to perform life saving emergency maneuvers such as CPR or injecting an Epipen. Our technology allows bystanders to help individuals in distress or urgent need by calling with the distressed individual's phone and the dispatcher can communicate pre-existing medical conditions so the bystander can take the proper actions.

## How we built it
Utilizing the instantaneous response of Firebase real time database, we were able to ensure the quick transfer of information from the caller to the dispatcher. Using React-Native we developed an app where users can set personal information such as name, age, pre-existing conditions, and medications. On the press of a button a call is made from the phone to a 911 dispatcher, and the caller's personal information, along with their GPS coordinates, are stored in our Firebase real time database. The dispatcher views a dashboard built using React and hosted on Google Cloud that loads the caller's personal information from Firebase. Here the dispatcher can read their medical information and view their location on a map in real time.

![Dispatch dashboard](https://github.com/zsilverman/HackDavis18/blob/master/dispatch-dashboard.png)

[Click to see our mobile app layout](https://github.com/zsilverman/HackDavis18/blob/master/mobile-app.jpg)

[Click to see an example of a life saving emergency video](https://github.com/zsilverman/HackDavis18/blob/master/cpr.jpg)
