import { ReactNode } from 'react';
import { ImageProps, ImageResizeMode } from 'react-native';

type Props = {
  height?: number;
  width?: number;
  images: ImageProps[];
  resizeMode?: ImageResizeMode;
  rotationRatio?: number;
  cursorSize: number;
  cursorIcon: ReactNode;
}

export function Image360viewer(props: Props): JSX.Element;
