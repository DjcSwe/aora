import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { React, useState }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [isSubmitting, setisSubmitting] = useState(false)
  const submit = () => {
    // Validate inputs
    if (!form.username) Alert.alert('Please enter a valid username');
    else if (!form.email) Alert.alert("Please enter a valid email");
    else if (!form.password) Alert.alert("Please enter a valid password");
    else createUser();
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[72vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white mt-10 font-psemibold">Sign up for Aora</Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(input) => setForm({...form, username: input})}
            otherStyles="mt-10"
            keyboardType="email-address"
          />
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(input) => setForm({...form, email: input})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(input) => setForm({...form, password: input})}
            otherStyles="mt-7"
          />
          <CustomButton 
            title="Create New Account"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="../" className='text-lg text-secondary font-semibold'>Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp