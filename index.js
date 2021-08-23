import React, {
  useState,
  useRef,
} from 'react';
import {
  View,
  Image,
  ImageProps,
  ImageResizeMode,
  PanResponder,
} from 'react-native';

/**
 * This is a library that shows images at 350 degrees.
 * @param {ImageProps[]} images 
 * - Vector images to rotate.
 * @param {number} height 
 * - Image height default is 250.
 * @param {number} width 
 * - Image width default is 250.
 * @param {number} rotationRatio 
 * - The drag distance compares to 180 degree. 
 * Example: width / rotationRatio = 180 degree. The value default is 0.5.
 * @param {ImageResizeMode} resizeMode 
 * - Image display mode. Default is contain.
 */

export function Image360viewer({
  images,
  height = 250,
  width = 250,
  rotationRatio = 0.5,
  resizeMode = 'contain'
}) {
  const [imageIndexSelected, setImageIndexSelected] = useState(0);

  const rotation = useRef({ value: width / 2 });
  const startRotation = useRef({ value: 0 });
  const rotatePeriod = useRef({ value: 360 / images.length });

  const startPositionXAxis = useRef({ value: 0 });
  const currentPositionXAxis = useRef({ value: 0 });

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gestureState) => {
      startPositionXAxis.current.value = gestureState.moveX;
    },
    onPanResponderMove: (_, gestureState) => {
      handleUpdateRotation(gestureState);
    },
    onPanResponderRelease: (_, gestureState) => {
      handleUpdateRotation(gestureState);
    }
  })).current;

  function handleUpdateRotation(gestureState) {
    startPositionXAxis.current.value = gestureState.moveX;

    const deltaRotation = (currentPositionXAxis.current.value - startPositionXAxis.current.value) * 180 / (rotationRatio * width);
    rotation.current.value = startRotation.current.value + deltaRotation;

    const mRotation = rotation.current.value - Math.floor(rotation.current.value / 360) * 360;
    setImageIndexSelected(Math.floor(mRotation / rotatePeriod.current.value));
  }

  return (
    <View {...panResponder.panHandlers} >
      <Image
        source={images[imageIndexSelected]}
        style={{ width, height }
        }
        resizeMode={resizeMode}
      />
    </View>
  );
}