/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';

 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
import AuthTest from "./src/authTest/AuthTest";

 const Section: React.FC<{
   title: string;
 }> = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };

 const useFetch = () => {
     const [d, setD] = React.useState('')
     React.useEffect(() => {
         if (!d) {
             const details = {
                 'username': 'FGUBARE',
                 'password': 'Ckfdf@2Bvgthfnjhe',
             };

             const formBody: string[] = []
             Object.keys(details).forEach((key: string) => {
                 const encodedKey = encodeURIComponent(key)
                 const encodedValue = encodeURIComponent(details[key as keyof typeof details])
                 formBody.push(encodedKey + "=" + encodedValue)
             })
             const formBodyString = formBody.join("&")
             // const res = fetch('https://gnsa.i.daimler.com/api/login/oauth2/code/', {
             // const res = fetch('https://gnsa-dev.i.daimler.com/api/v1/row-meta/standard/standard/1000000072', {
             // const res = fetch('https://login-int.daimler.com/', {
             const res = fetch('https://gnsa-dev.i.daimler.com/api/v1/auth/authenticate', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded'
                     // 'Cookie': 'locale=en/Asia/Aden; JSESSIONID=FCEBC0C94BE5056D723449B6F909555F'
                 },
                 body: formBodyString

             })
             // .then((response) => response.json())
             .then((json) => setD(JSON.stringify(json, null, 2)))
             .catch((e) => setD(JSON.stringify(e, null, 2)))
         }
     },
         [d, setD]
     )
     return d
 }

 const App = () => {
   // const isDarkMode = useColorScheme() === 'dark';
   //
   // const d = useFetch()
   //
   // const backgroundStyle = {
   //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   // };
   //
   // return (
   //   <SafeAreaView style={backgroundStyle}>
   //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
   //     <ScrollView
   //       contentInsetAdjustmentBehavior="automatic"
   //       style={backgroundStyle}>
   //       <View
   //         style={{
   //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
   //         }}>
   //         <Section title="Step One">
   //             <Text>{ d }</Text>
   //         </Section>
   //       </View>
   //     </ScrollView>
   //   </SafeAreaView>
   // );

     return <AuthTest/>
 };

 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });

 export default App;
