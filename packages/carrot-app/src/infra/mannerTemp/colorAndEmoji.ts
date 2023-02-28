export const colorAndEmoji = (value: number) => {
  if (value < 30) return ['black', '💀'];
  else if (value < 36.5 && value >= 30) return ['#3D1766', '😫'];
  else if (value >= 36.5 && value < 38) return ['#39B5E0', '😳'];
  else if (value >= 38 && value < 40) return ['#38E54D', '😊'];
  else if (value >= 40 && value < 45) return ['#FF8B3A', '😃'];
  else if (value >= 45 && value < 50) return ['#FF6347', '🤩'];
  else return ['#F22D50', '😍'];
};
