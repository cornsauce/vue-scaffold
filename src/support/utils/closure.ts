export function executeOnce(fn: () => void): () => void {
  let executed = false;

  return () => {
    if (executed) {
      return;
    }

    fn();
    executed = true;
  };
}
