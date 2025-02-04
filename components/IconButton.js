import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

//Asignar tipo de icons 
export default function IconButton({ icon, label, onPress }) {
    return (
    <Pressable style={styles.iconButton} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color="#fff" />
        <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
    );
}

//Estilo de icons en pantalla 
const styles = StyleSheet.create({
    iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    },
    iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
    },
});


