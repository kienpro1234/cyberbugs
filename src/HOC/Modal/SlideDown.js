import React from "react";
import { useSpring, animated } from "react-spring";
export default function SlideDown(Component) {
  const propsSpring = useSpring({
    to: { marginTop: 0 },
    from: { marginTop: -100 },
    config: { duration: 500 },
  });

  return (

      <animated.div style={propsSpring}>
        <Component />
      </animated.div>

  );
}
