import { LogBox, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import Start from "./components/Start";
import Chat from "./components/Chat";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBH0QOL_ICNQq0vPy8miFmhxTg4BdY8ksM",
	authDomain: "chatapp-41ca4.firebaseapp.com",
	projectId: "chatapp-41ca4",
	storageBucket: "chatapp-41ca4.appspot.com",
	messagingSenderId: "789129214199",
	appId: "1:789129214199:web:c90df4278ce1ab38c27bf2",
};
const Stack = createNativeStackNavigator();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connection check and Alert
const App = () => {
	const connectionStatus = useNetInfo().isConnected;
	useEffect(() => {
		if (connectionStatus === false) {
			Alert.alert("Connection Lost!");
			disableNetwork(db);
		} else if (connectionStatus === true) {
			enableNetwork(db);
		}
	}, [connectionStatus]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start" component={Start} />
				<Stack.Screen name="Chat">{(props) => <Chat isConnected={connectionStatus} db={db} {...props} />}</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
