import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "../global.css";

export default function App() {
    return (
        <View>
            <Text className="text-3xl font-pblack">Index.jsx</Text>
            <Link href="./profile" style={{color:'blue'}}>Go to Profile</Link>
            <StatusBar style="auto" />
        </View>
    );
}