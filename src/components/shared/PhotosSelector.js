import React, { useState, useContext, useEffect } from  'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Text,
    ScrollView,
    Image
} from 'react-native'
import {AuthContext} from './../../providers/auth.js';
import Modal from "react-native-modal";
import {MediaLibrary} from 'react-native-unimodules';

const {height, width} = Dimensions.get('screen');

const PhotosSelector = ({isVisible, setVisible, provider, onClose, selectPhoto}) => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const [photos, setPhotos] = useState([]);
    const [lastId, setLastId] = useState(null);
    
    useEffect( () => {
        getPhotos(50, null);
    }, [provider]);

    const getPhotos = async (first, after) => {
        try {
            const {totalCount, assets, endCursor, hasNextPage} = await MediaLibrary.getAssetsAsync({first, after});
            setPhotos(photos.concat(assets));
            setLastId(endCursor);
        } catch(err) {
            console.log(err)
        };
    };

    const onScroll = ({nativeEvent}) => {
        const { layoutMeasurement: { height: layoutHeight}, contentSize: { height }, contentOffset: { y }} = nativeEvent;

        if(y + layoutHeight > height - layoutHeight / 2) {
            getPhotos(50, lastId)
        }
    };

    return (
        <Modal 
            style={style.modal} 
            isVisible={isVisible}
            onModalHide={onClose}
            useNativeDriver={true}
            onBackdropPress={() => setVisible(false)}>
            <View style={style.main}>
                <Text>{provider}</Text>
                <ScrollView scrollEventThrottle={16} onScroll={onScroll}>
                    <View style={style.photos_container}>
                    { photos.map((p, index) => {
                        return (
                            <TouchableOpacity 
                                key={index}
                                style={style.photo} 
                                onPress={() => selectPhoto(p, index)}>
                                <View style={{...style.dot, backgroundColor: p.selected ? '#FF7878' : '#FF7878'}}></View>
                                <Image
                                    style={style.image}
                                    source={{ uri: p.uri }}></Image>
                            </TouchableOpacity>
                        );
                    })}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
};

export default PhotosSelector;

const style = StyleSheet.create({
    modal: {
        width,
        left: -20,
        bottom: -20,
        justifyContent: 'flex-end'
    },
    main: {
        height: '95%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20
    },
    photos_container: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#000',
        position: 'relative'
    },
    title: {
        fontSize: 24,
        fontFamily: 'coachellaregular'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    dot: {
        position: 'absolute',
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#fff',
        bottom: 5,
        right: 5,
        zIndex: 2
    }
})