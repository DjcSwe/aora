import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "../global.css";

export default function App() {
    return (
        <View>
            <Text className="text-3xl font-pblack">Index.jsx</Text>
            <Link href="./home" style={{color:'blue'}}>Go to Home</Link>
            <StatusBar style="auto" />
        </View>
    );
}