import React from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

import { LinePath } from './LinePath';
import { getYForX, parse } from './pathTools';

import directionsImg from '../../assets/icons/directions.png';

const path = "M367 33C367 34.4636 366.177 36.1856 363.935 38.1448C361.705 40.0945 358.298 42.068 353.722 44.003C344.587 47.8662 331.245 51.3902 314.609 54.3658C281.369 60.3111 235.368 64 184.5 64C133.632 64 87.6309 60.3111 54.3909 54.3658C37.7546 51.3902 24.4133 47.8662 15.2779 44.003C10.702 42.068 7.2952 40.0945 5.0646 38.1448C2.82316 36.1856 2 34.4636 2 33C2 31.5364 2.82316 29.8144 5.0646 27.8552C7.2952 25.9055 10.702 23.932 15.2779 21.997C24.4133 18.1338 37.7546 14.6098 54.3909 11.6342C87.6309 5.68887 133.632 2 184.5 2C235.368 2 281.369 5.68887 314.609 11.6342C331.245 14.6098 344.587 18.1338 353.722 21.997C358.298 23.932 361.705 25.9055 363.935 27.8552C366.177 29.8144 367 31.5364 367 33Z";
const pathParsed = parse(path);

export const CURSOR_SIZE = 40;

export function Cursor({
  cursorRadius = CURSOR_SIZE / 2,
  cursorIcon,
  cursorCurrentPosition,
  color,
  primaryColor,
  secondaryColor,
  stopColor,
}) {
  const animatedStyle = {
    borderRadius: cursorRadius,
    transform: [
      { translateX: cursorCurrentPosition - CURSOR_SIZE / 2 },
      { translateY: Number(getYForX(pathParsed, cursorCurrentPosition)) - (CURSOR_SIZE / 2) }
    ]
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.cursor, animatedStyle, { backgroundColor: color }]}>
        {cursorIcon ? cursorIcon : <Image source={directionsImg} style={styles.icon} />}
      </Animated.View>

      <LinePath
        path={path}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        stopColor={stopColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: -55,
    height: 70
  },
  cursor: {
    position: 'absolute',
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  icon: {
    width: 25,
    height: 15
  }
});