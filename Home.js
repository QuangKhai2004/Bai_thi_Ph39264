import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import List from './HomeScreen'
import Banner from './Banner'


const Home = () => {
  return (
    
    <View style={styles.container}>
      <Banner></Banner>
      <List></List>
    </View>
    
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})