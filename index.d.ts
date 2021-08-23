import { ImageProps, ImageResizeMode } from 'react-native';

type Props = {
  height?: number;
  width?: number;
  images: ImageProps[];
  resizeMode?: ImageResizeMode;
  rotationRatio?: number;
}

export function Image360viewer(props: Props): void;
