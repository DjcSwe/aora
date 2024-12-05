import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {
   const [form, setForm] = useState({
      email: "",
      password: "",
   })
   const [isSubmitting, setisSubmitting] = useState(false)
   const submit = async () => {
      // Validate inputs
      if (!form.email || !validateEmail(form.email))
         Alert.alert("Error", "Please enter a valid email.");
      else if (!form.password)
         Alert.alert("Error", "Please enter a valid password.");
      else { // inputs valid, create new user
         setisSubmitting(true);
         try {
            await signIn(form.email, form.password); 
            // TODO: set form data to global state
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
         <ScrollView>
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
                  handlePress={submit}
                  containerStyles="mt-7"
                  isLoading={isSubmitting}
               />
               <View className="justify-center pt-5 flex-row gap-2">
                  <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
                  <Link href="/sign-up" className='text-lg text-secondary font-semibold'>Sign Up</Link>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default SignIn