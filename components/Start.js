import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
	const [text, setText] = useState("");
	const [color, setColor] = useState("");

	const auth = getAuth();

	const signInUser = () => {
		signInAnonymously(auth)
			.then((result) => {
				navigation.navigate("Chat", {
					id: result.user.uid,
					name: text ? text : "User",
					color: color ? color : "white",
				});
				Alert.alert("Signed in successfully!");
			})
			.catch((error) => {
				Alert.alert("Unable to sign in, try again later.");
			});
	};

	return (
		<ImageBackground
			source={require("../assets/BackgroundImage.png")}
			resizeMode="cover"
			style={styles.backgroundImage}>
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<Text style={styles.title}>Chat App!</Text>
				</View>
				<View style={styles.subContainer}>
					<TextInput placeholder="Enter your name" style={styles.input} onChangeText={setText} />
					<Text>Choose Background Color</Text>
					<View style={styles.radioButtonContainer}>
						<TouchableOpacity
							style={[styles.radioButton, { backgroundColor: "#ff5e5e" }]}
							onPress={() => setColor("#ff5e5e")}></TouchableOpacity>
						<TouchableOpacity
							style={[styles.radioButton, { backgroundColor: "#69cfff" }]}
							onPress={() => setColor("#69cfff")}></TouchableOpacity>
						<TouchableOpacity
							style={[styles.radioButton, { backgroundColor: "#54ffd4" }]}
							onPress={() => setColor("#54ffd4")}></TouchableOpacity>
						<TouchableOpacity
							style={[styles.radioButton, { backgroundColor: "#fff869" }]}
							onPress={() => setColor("#fff869")}></TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.button} onPress={signInUser}>
						<Text>Start Chatting</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	subContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "88%",
	},
	radioButtonContainer: {
		width: "70%",
		flexDirection: "row",
		justifyContent: "space-around",
		margin: 20,
	},
	title: {
		fontWeight: "bold",
		fontSize: 50,
		color: "#FFFFFF",
		marginBottom: 30,
	},
	input: {
		borderColor: "#8A8F9E",
		borderWidth: 1,
		borderRadius: 3,
		padding: 10,
		width: "100%",
		marginBottom: 20,
	},
	radioButton: {
		height: 24,
		width: 24,
		borderRadius: 12,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#757083",
		padding: 20,
		borderRadius: 8,
		width: "100%",
	},
});

export default Start;
