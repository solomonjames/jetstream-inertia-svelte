
const updateDisplay = (node, show) => {
  node.style.display = show ? '' : 'none';
};

export default function toggleDisplay(node, show) {
  updateDisplay(node, show);

  return {
    update(show) {
      updateDisplay(node, show);
    }
  };
}
