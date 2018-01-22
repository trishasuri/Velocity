import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    color1: {
        flex: 1,
        backgroundColor: colors.background1
    },
    color2: {
        flex: 1,
        backgroundColor: colors.background2
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    title: {
        paddingTop: 30,
        paddingLeft: 25,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 30,
    },
    subtitle: {
        paddingTop: 5,
        paddingLeft: 25,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
    },
    slider: {
        marginBottom: 30,
    },
    sliderContainer: {
    }
});