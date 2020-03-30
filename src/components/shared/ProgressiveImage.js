import React, {useState} from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
// import Animated, { Easing,  } from "react-native-reanimated";

const ProgressiveImage = ({
    thumbnailSource,
    source,
    style,
    ...props
}) => {
    const thumbnailAnimated = new Animated.Value(0);
    const imageAnimated = new Animated.Value(0);
    const handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
        toValue: 1,
        }).start();
    }
    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
        toValue: 1,
        }).start();
    }

  return (
        <View style={styles.container}>
            <Animated.Image
                {...props}
                source={thumbnailSource}
                style={[style, { opacity: thumbnailAnimated }]}
                onLoad={handleThumbnailLoad}
                blurRadius={1}
                style={[
                    {
                        width: '100%',
                        height: '100%'
                    }
                ]}
            />
            <Animated.Image
                {...props}
                source={source}
                style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
                onLoad={onImageLoad}
                style={[
                    {
                        width: '100%',
                        height: '100%'
                    }
                ]}
            />
        </View>
  )
}

export default ProgressiveImage;

const styles = StyleSheet.create({
    imageOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    container: {
      backgroundColor: '#e1e4e8',
    },
});