export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

export const simulateProgress = (setProgress) => {
  const timer = setInterval(() => {
    setProgress((prev) => {
      if (prev < 100) return prev + 10;
      clearInterval(timer); // Stop progress once it's complete
      return 100;
    });
  }, 300); // Update every 300ms to simulate progress

  return timer;
};
