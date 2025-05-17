import { useEffect, useState } from "react";
import { Text } from "react-native-elements";
import { styles } from "../styles/global";

const TypingText = ({ text, speed= 120, delay= 8000 } : { text: string, speed?: number, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout;
    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
    }
    else {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, delay);
    }
  }, [index, text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <Text style={styles().typingText}>
      {displayedText}
      {showCursor ? '|' : ' '}
    </Text>
  );
}

export default TypingText;