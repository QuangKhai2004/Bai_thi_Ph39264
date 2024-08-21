import React from 'react';
import { View, Image } from 'react-native';

const Banner = () => {
  return (
    <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: 'https://img.lovepik.com/free-png/20210919/lovepik-classroom-png-image_400486184_wh1200.png' }} 
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Banner;
