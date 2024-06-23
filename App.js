import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

import * as ImagePicker from 'expo-image-picker'
import { useState, useRef } from 'react';

import CircleButton from './components/CirculeButton';
import IconButton from './components/IconButton';

import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import DomToImage from 'dom-to-image';

//Elegir Imagen Predefinida
const PlaceholderImage = require('./assets/images/background-image.png')
//Nuestra funcion q muestra la  imagen y los botones para trabajar
export default function App() {

  const [pickedEmoji, setPickedEmoji] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [ showAppOptions, setShowAppOptions ] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [ status, requestPermission ] = MediaLibrary.usePermissions()

  //Elegir imagen del directorio
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled){
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }else{
      alert('No has seleccionado una Imagen.')
    }
  };
  //Funcion para volver a seleccionar imagen 
  const onReset = () =>{
    setShowAppOptions(false);
  };
  //Funcion agregar stiker
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  //Hacer captura de pantalla
  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web'){
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Imagen Guardada!!");
        }
      } catch (e) {
        console.log(e);
      } 
    } else {
      try {
        const dataUrl = await DomToImage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'stiker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      }catch (e) {
        console.log(e);
      }
    }
  };

  //Permitir permiso a los estados
  if (status === null) {
    requestPermission();
  }

  const imageRef = useRef();

  //Configuracion pantalla
  return (
    //Imagen de pantalla
    <GestureHandlerRootView style={styles.container}>  
      
      <View style={styles.container}>
        
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false} >
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </View>
          </View>
          {showAppOptions ? (
          <View style={styles.optionsContainer} >
            <View style={styles.optionsRow} >
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
            </View>
          </View>
        ) : (
          //Botones de pie de pagina
        <View style={styles.footerContainer}>
          {<Button theme="primary" label="Elige una foto" onPress={pickImageAsync}/> }
          <Button label="Usar esta foto" onPress={() => setShowAppOptions(true)} />
        </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
  );
}
//Estilos de contenedores 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
