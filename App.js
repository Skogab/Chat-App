import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start" component={Start} />
				<Stack.Screen name="Chat">{(props) => <Chat {...props} db={db} />}</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
