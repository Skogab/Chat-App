import { Alert, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
	apiKey: "AIzaSyBH0QOL_ICNQq0vPy8miFmhxTg4BdY8ksM",
	authDomain: "chatapp-41ca4.firebaseapp.com",
	projectId: "chatapp-41ca4",
	storageBucket: "chatapp-41ca4.appspot.com",
	messagingSenderId: "789129214199",
	appId: "1:789129214199:web:c90df4278ce1ab38c27bf2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

const App = () => {
	const connectionStatus = useNetInfo();
	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			Alert.alert("Connection Lost!");
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start" component={Start} />
				<Stack.Screen name="Chat">
					{(props) => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
