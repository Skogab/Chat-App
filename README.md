## Firebase Chat App

This is a React Native app for a chat application that allows users to chat with each other in real-time. The app is built using Firebase as the backend service provider.

## Prerequisites

- Node.js
- Firebase account

## Installation

1. Clone the repository.
2. Navigate to the project directory in the terminal.
3. Run `npm install` to install the necessary dependencies.
4. Create a Firebase project in your Firebase console.
5. Copy the configuration object and paste it in the `firebaseConfig` object in the code.
6. Enable Firestore and Storage services in the Firebase console.
7. Run `npm expo install`
8. Run expo start

## Usage

1. On the start screen, users can enter their name and select a background color by tapping one of the colored circles.
2. Tap the "Start Chatting" button to proceed to the chat screen.
3. On the chat screen, users can see the messages sent by other users and send messages themselves by typing in the message input and tapping the "Send" button.
4. Users can also send images or their current location by tapping the "+" button on the message input.
5. To send an image, users can choose an image from their library or take a new photo using their camera.
6. To send their current location, users can tap the "Send Location" option.
7. Chat history is automatically saved and can be accessed by logging back in with the same name and background color.

## Technologies Used

- React Native
- Firebase (Firestore, Storage)
- Node.js
- Expo
- React Native Gifted Chat
