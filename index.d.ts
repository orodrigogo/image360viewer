import { ReactNode } from 'react';
import { ImageResizeMode } from 'react-native';

type Props = {
  images: string[];
  resizeMode?: ImageResizeMode;
  rotationRatio?: number;
  height?: number;
  width?: number;
  cursorSize?: number;
  cursorIcon?: ReactNode;
  primaryColor?: string;
  secondaryColor?: string;
  stopColor?: string;
}

export function Image360viewer(props: Props): JSX.Element;
