import { StyleSheet, Image } from "react-native";

//Mostrar Imagen y mantener url de la seleccionada
export default function ImageViewer({ placeholderImageSource, selectedImage }) {

    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

    return (
        <Image source={imageSource} style={styles.image} />
    );
}
//Darle estilo a la imagen en pantalla
const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});