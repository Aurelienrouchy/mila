import React, { useState } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Dimensions, TouchableOpacity,
    Image,
    Animated as Anim
} from 'react-native';
import {STATUS_BAR_HEIGHT, HEADER_HEIGHT, profiles_next as profilesX, profiles} from './../../constants/constants';
import ProgressiveImage from './../shared/ProgressiveImage.js'
import Animated from 'react-native-reanimated';

const {height, width} = Dimensions.get('screen');

const Card = ({
    profile,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag
}) => {
    const [search, setSearch] = useState(false);
    const opacity =  new Anim.Value(0);
    const  onLoad = () => {
        Anim.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const generateColor = () => '#' +  Math.random().toString(16).substr(-6);

    return (
        <View style={styles.card}>
            <View style={{...styles.photo_profile, backgroundColor: 'black'}} >
                <ProgressiveImage
                    source={profile.picture}
                    thumbnailSource={profile.thumbnail}
                    style={[
                        {
                            width: '100%',
                            height: '100%'
                        }
                    ]}
                />
            </View>
            <Animated.ScrollView 
                // onScroll={onScroll}
                onScrollBeginDrag={onScrollBeginDrag}
                onScrollEndDrag={onScrollEndDrag}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}>
                <View style={styles.scrollView}>
                    <View style={styles.margin_view}>{}</View>
                    <View style={styles.profile_infos_container}>
                        <View style={styles.profile__infos}>
                            <View style={styles.infos__name_and_age}>
                                <Text style={styles.infos__name}>{profile.fname}</Text>
                                <Text style={styles.infos__age}>{profile.age}</Text>
                            </View>
                            <Text style={styles.infos__city}>{profile.city}, {profile.distance}km</Text>
                        </View>
                        
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden'
    },
    margin_view: {
        marginTop: height - (HEADER_HEIGHT + STATUS_BAR_HEIGHT + 120)
    },
    profile_container: {
        position: 'relative',
        zIndex: 2,
        width,
        height: height - (HEADER_HEIGHT + STATUS_BAR_HEIGHT),
        borderRadius: 20,
        overflow: 'hidden'
    },
    profile_back_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: height - (HEADER_HEIGHT + STATUS_BAR_HEIGHT),
        borderRadius: 20,
        overflow: 'hidden'
    },
    backgroundPhoto: {
        height: '100%',
        width: '100%',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    profile_infos_container: {
        width: width,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 400,
        borderColor: '#000',
        borderWidth: 2
    },
    profile__infos: {
        height: 120,
        width,
        paddingHorizontal: 30,
        paddingBottom: 16,
        justifyContent: 'space-evenly'
    },
    infos__name_and_age: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infos__name: {
        fontSize: 28,
        fontFamily: 'coachellaregular'
    },
    infos__age: {
        fontSize: 24,
        fontFamily: 'coachellaregular'
    },
    infos__city: {
        fontSize: 24,
        fontFamily: 'coachellaregular',
        color: '#9F9F9F'
    },
    photo_profile: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    }
})

export default Card;
