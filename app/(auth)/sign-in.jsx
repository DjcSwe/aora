import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { Link, router } from 'expo-router'
import { checkActiveSession, deleteSessions, signIn, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
   const { setUser, setisLoggedIn } = useGlobalContext();
   const [isSubmitting, setisSubmitting] = useState(false)
   const [form, setForm] = useState({
      email: "",
      password: "",
   })

   function validateInput() {
      const emailRegex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(form.email)) Alert.alert("Error", "Please enter a valid email.");
      else if (!form.password) Alert.alert("Error", "Please enter a valid password.");
      else logIn()
   }

   async function logIn() {
      setisSubmitting(true);
      try {
         if (await checkActiveSession()) await deleteSessions();
         await signIn(form.email, form.password);
         const result = await getCurrentUser();
         setUser(result);
         setisLoggedIn(true);
         router.replace("/home");
      } catch (error) {
         // TODO: get unique error messages
         Alert.alert("Error", "There was an issue singning in. Please try again.");
         console.log("logIn: ", error);
         setisSubmitting(false);
         throw error;
      } finally {
         setisSubmitting(false);
      }
   }

   return (
      <SafeAreaView className="bg-primary h-full">
         <View className="w-full justify-center min-h-[72vh] px-4 my-6">
            <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
            <Text className="text-2xl text-white mt-10 font-psemibold">Log in to Aora</Text>
            <FormField
               title="Email"
               value={form.email}
               handleChangeText={(e) => setForm({ ...form, email: e })}
               otherStyles="mt-7"
               keyboardType="email-address"
            />
            <FormField
               title="Password"
               value={form.password}
               handleChangeText={(e) => setForm({ ...form, password: e })}
               otherStyles="mt-7"
            />
            <CustomButton
               title="Sign In"
               handlePress={validateInput}
               containerStyles="mt-7"
               isLoading={isSubmitting}
            />
            <View className="justify-center pt-5 flex-row gap-2">
               <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
               <Link href="/sign-up" className='text-lg text-secondary font-semibold'>Sign Up</Link>
            </View>
         </View>
         {isSubmitting ? (
            <View>
               <ActivityIndicator size="large" />
               <Text className="text-center text-lg text-gray-100 font-pregular mt-4">
                  Signing in...
               </Text>
            </View>
         ) : null}
      </SafeAreaView>
   )
}

export default SignIn