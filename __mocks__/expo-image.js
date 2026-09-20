import React from 'react';
import { Image } from 'react-native';

const ExpoImage = React.forwardRef((props, ref) => (
  <Image {...props} ref={ref} />
));

ExpoImage.displayName = 'ExpoImage';

export default ExpoImage;
