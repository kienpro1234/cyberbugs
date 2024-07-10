import React from "react";
import { animated, easings, useSpring } from "react-spring";

export const LearningReactSpring = () => {
  // const [springs, api] = useSpring(() => ({
  //     from: {x: 0},
  // }))
  // const handleClick = () => {
  //     api.start({
  //         from: {x: 0},
  //         to: {x: 100},
  //     })
  // }

  // const [springs, api] = useSpring(
  //   () => ({
  //     y: 0,
  //     config: {
  //       easing: easings.steps(5),
  //     },
  //   }),
  //   []
  // )

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    // immediate: true,
    config: {
      duration: 1000,
      easing: easings.easeInOut,
    },
  }));

  const handleClick = () => {
    api.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      // immediate: true,
      // loop: true,
      // immediate: true,
      // delay: 1000,
      // reset: false,
      // reverse: true,
      // pause: true,
      // cancel: true,
      config: {
        duration: 1000,
        easing: easings.easeInOutBack,
      },
    });
  };

  return (
    <animated.div
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        backgroundColor: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    ></animated.div>
  );
};
