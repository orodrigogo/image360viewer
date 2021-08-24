import React from 'react';
import Svg, {
  LinearGradient,
  Path,
  Defs,
  Stop
} from 'react-native-svg';

export function LinePath({
  path,
  primaryColor = '#DA0000',
  secondaryColor = '#EA8C8A',
  stopColor = '#FFF',
}) {
  return (
    <Svg
      width='100%'
      height='100%'
      viewBox="0 0 369 66"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        d={path}
        stroke="url(#paint0_linear)"
        strokeWidth="4"
      />

      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="185"
          y1="66"
          x2="185"
          y2="-2.74149e-06"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={primaryColor} />
          <Stop offset="0.787091" stopColor={secondaryColor} />
          <Stop offset="1" stopColor={stopColor} stopOpacity="0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}