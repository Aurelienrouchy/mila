import React, { useState, useContext, useEffect } from  'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StyleSheet, 
    View, 
    ImageBackground,
    TouchableOpacity, 
    Dimensions, 
    Animated, 
    Text 
} from 'react-native'
import ProgressBotttom from './ProgressBotton.js';
import {AuthContext} from './../../providers/auth.js';
import PhotosSelector from './../shared/PhotosSelector.js'
import ProviderPhotosSelector from './../shared/ProviderPhotosSelector.js'

const {height, width} = Dimensions.get('screen');

const ChoosePhotos = (props) => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [photosSelectorIsVisible, setPhotosSelectorIsVisible] = useState(false);
    const [providerPhotosIsVisible, setProviderPhotosIsVisible] = useState(false);
    const [provider, setProvider] = useState('');
    const [photos, setPhotos] = useState([{}, {}, {}, {}, {}, {}])

    const providers = [{
        name: 'Facebook',
        connected: true
    }, {
        name: 'Instagram',
        connected: false
    }, {
        name: 'Camera',
        connected: true
    }]

    const next = () => {
        context.updateUserData();
        navigation.navigate('');
    };

    const openProviderSelector = index => {
        setCurrentIndex(index);
        setProviderPhotosIsVisible(true);
    };

    const onClickProvider = provider => {
        setProvider(provider);
        setProviderPhotosIsVisible(false);
    };

    const afterClose = () => {
        if(provider) {
            setPhotosSelectorIsVisible(true)
        }
        return
    };

    const onClosePhotosSelector = () => setProvider('');

    const selectPhoto = (photo, index) => {
        const allPhotos = photos;
        allPhotos[index] = photos;
        setPhotos(allPhotos);
    };

    return (
        <View style={style.main}>
            <View style={style.inputs_container}>
                <Text style={style.title}>Choose your best photos !</Text>
                <View style={style.selectors_container}>
                    { photos.map((p, index) => (
                        <TouchableOpacity key={index} style={style.selector} onPress={() => openProviderSelector(index)}>
                            <ImageBackground source={{ uri: p.uri }} style={style.image}>
                                <Text>Inside</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <PhotosSelector
                selectPhoto={selectPhoto}
                isVisible={photosSelectorIsVisible}
                provider={provider}
                onClose={onClosePhotosSelector}
                setVisible={setPhotosSelectorIsVisible}/>
            <ProviderPhotosSelector
                isVisible={providerPhotosIsVisible}
                providers={providers}
                onClickProvider={onClickProvider}
                afterClose={afterClose}
                setVisible={setProviderPhotosIsVisible}/>
            <ProgressBotttom num="6" nav={navigation} next={next}/>
        </View>
    )
};

export default ChoosePhotos;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: height / 8,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontFamily: 'coachellaregular'
    },
    selectors_container: {
        marginTop: height / 8,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    selector: {
        borderColor: '#000',
        marginBottom: (width - 60 - (width / 4) * 3) / 2,
        borderRadius: 10,
        borderWidth: 2,
        height: width / 4,
        width: width / 4
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})