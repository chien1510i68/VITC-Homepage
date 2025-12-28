export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: -50 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: {
      duration: 0.2
    }
  }
};

export const successVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
};