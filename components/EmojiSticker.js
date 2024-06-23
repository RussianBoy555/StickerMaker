import { View } from 'react-native';
import { Gesture,GestureDetector } from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

//Funcion para insertar el stiker
export default function EmojiSticker({ imageSize, stickerSource }) {
    
    //Creamos una funcion que vaya tromando los valores de posicion
    const translateX = useSharedValue(0);
    const translatey = useSharedValue(0);

    const drag = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX;
            translatey.value += event.changeY;
        });
    //Creamos una funcion para cambiar la posicion
    const containerStyle = useAnimatedStyle (() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translatey.value,
                },
            ],
        };
    });
    
    //Creamos un objeto para poder utlizar el doble toque para modificar la imagen
    const scaleImage = useSharedValue(imageSize);
    
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            }
        });
    //Definimos una funcion para crear un movimiento natural
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={[imageStyle,{ width: imageSize, height: imageSize }]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}

