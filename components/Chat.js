import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		navigation.setOptions({ title: route.params.name });
		const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

		// If connection, fetch messages from Firestore database
		if (isConnected) {
			const unsubscribe = onSnapshot(q, (docs) => {
				let newMessages = [];
				docs.forEach((doc) => {
					newMessages.push({
						id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis()),
					});
				});
				setMessages(newMessages);
				// Cache messages in AsyncStorage
				AsyncStorage.setItem("messages", JSON.stringify(newMessages));
			});
			return () => {
				unsubscribe();
			};
		}
		// If not, load cached messages from local storage
		else {
			AsyncStorage.getItem("messages").then((cachedMessages) => {
				if (cachedMessages) setMessages(JSON.parse(cachedMessages));
			});
		}
	}, [isConnected]);

	const onSend = (newMessages) => {
		addDoc(collection(db, "messages"), newMessages[0]);
	};

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: "#000",
					},
					left: {
						backgroundColor: "#FFF",
					},
				}}
			/>
		);
	};

	// No InputToolbar when offline
	const renderInputToolbar = (props) => {
		if (isConnected) {
			return <InputToolbar {...props} />;
		} else {
			return null;
		}
	};

	return (
		<View style={styles.container}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: 1,
					name: route.params.name,
				}}
			/>
			{Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
			{Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Chat;
