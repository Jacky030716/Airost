import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Reveal = ({ children, width = '100%' }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    } else {
      animation.start('hidden');
    }
  }, [animation, inView]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden"}}>
      <motion.div
        animate={animation}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        transition={{
          duration: 0.75,
          delay: 0.25
        }}
      >
        {children}
      </motion.div>
      <motion.div
        animate={animation}
        variants={{
          hidden : { left: 0},
          visible: { left: "100%"}
        }}
        initial="hidden"
        transition={{
          duration: 0.75,
          ease: "easeIn"
        }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          backgroundColor: "lightgrey",
          zIndex: 20,
        }}
      />
    </div>
  );
};

export default Reveal;