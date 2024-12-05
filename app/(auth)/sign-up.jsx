import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import { React, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
   const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
   });
   const [isSubmitting, setisSubmitting] = useState(false);
   const submit = async () => {
      // Validate inputs
      if (!form.username)
         Alert.alert("Error", "Please enter a valid username.");
      else if (!form.email || !validateEmail(form.email))
         Alert.alert("Error", "Please enter a valid email.");
      else if (!form.password)
         Alert.alert("Error", "Please enter a valid password.");
      else { // inputs valid, create new user
         setisSubmitting(true);
         try {
            const result = await createUser(
               form.email,
               form.password,
               form.username
            ); // TODO: set form data to global state
            router.replace("/home");
         } catch (error) {
            console.log("sign-up.jsx", error);
            setisSubmitting(false);
            Alert.alert("Error", error.message);
         }
      }
   };
   function validateEmail(email) {
      const regexp =
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(email);
   }
   return (
      <SafeAreaView className="bg-primary h-full">
         <View
            className={`${isSubmitting ? "opacity-20" : ""
               } w-full justify-center min-h-[72vh] px-4 my-6`}
            pointerEvents={`${isSubmitting ? "none" : null}`}
         >
            <Image
               source={images.logo}
               resizeMode="contain"
               className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white mt-10 font-psemibold">
               Sign up for a new account.
            </Text>
            <FormField
               title="Username"
               value={form.username}
               handleChangeText={(input) => setForm({ ...form, username: input })}
               otherStyles="mt-10"
               keyboardType="email-address"
            />
            <FormField
               title="Email"
               value={form.email}
               handleChangeText={(input) => setForm({ ...form, email: input })}
               otherStyles="mt-7"
               keyboardType="email-address"
            />
            <FormField
               title="Password"
               value={form.password}
               handleChangeText={(input) => setForm({ ...form, password: input })}
               otherStyles="mt-7"
            />
            <CustomButton
               title="Create New Account"
               handlePress={submit}
               containerStyles="mt-7"
               isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
               <Text className="text-lg text-gray-100 font-pregular">
                  Have an account already?
               </Text>
               <Link href="../" className="text-lg text-secondary font-semibold">
                  Sign in
               </Link>
            </View>
         </View>
         {isSubmitting ? (
            <View>
               <ActivityIndicator size="large" />
               <Text className="text-center text-lg text-gray-100 font-pregular mt-4">
                  Creating account...
               </Text>
            </View>
         ) : null}
      </SafeAreaView>
   );
};

export default SignUp;
