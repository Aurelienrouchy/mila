import React, { useState } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    Animated as Anim
} from 'react-native';
import {profiles_next} from '../../constants/constants'
const {height, width} = Dimensions.get('screen');

const AdRegister = ({
    navigation,
    route
}) => {
    const [name, setName] = useState(false);
    const profile = route.params.profile;
    const [currentIndex, setCurrentIndex] = useState(null);
    const [photosSelectorIsVisible, setPhotosSelectorIsVisible] = useState(false);
    const [providerPhotosIsVisible, setProviderPhotosIsVisible] = useState(false);
    const [provider, setProvider] = useState('');
    const [photos, setPhotos] = useState([profiles_next[0], {}, {}]);

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
        <View style={styles.main}>
            <View style={styles.inputs_container}>
                <Text style={styles.title}>Choose your best photos !</Text>
                <View style={styles.selectors_container}>
                    { photos.map((p, index) => {
                        if(index === 0) {
                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    style={styles.selector}
                                    onPress={() => openProviderSelector(index)}>
                                    <ImageBackground
                                        source={{ uri: profile.picture }} 
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                        )
                        } else {
                            return (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.selector} 
                                onPress={() => openProviderSelector(index)}>
                                <ImageBackground source={{ uri: p.uri }} style={styles.image}>
                                    <Text>Inside</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            )
                        }
                    }).reverse()}
                </View>
            </View>
            {/* <PhotosSelector
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
                setVisible={setProviderPhotosIsVisible}/> */}
        </View>
    )
};

AdRegister.sharedElements = (navigation) => {
    return [{
        id: '12'
      }];
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: height - height / 8,
        backgroundColor: '#fff',
        paddingTop: height / 8,
        marginTop: height / 8,
        paddingHorizontal: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        // fontFamily: 'coachellaregular'
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
    },
    plus: {
        fontSize: 40
    }
})

export default AdRegister;
