import { Html } from '@react-three/drei';
import CircleLoader from 'react-spinners/CircleLoader';

const Loader = () => {
  return (
    <Html fullscreen className="load-background">
      <CircleLoader color="rgb(255,255,255)" />
    </Html>
  );
};

export default Loader;