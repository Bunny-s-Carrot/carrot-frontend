import { useEffect, useRef, useState } from 'react'

const useChatRoomDetailViewModel = () => {
  const [message, setMessage] = useState('');
  const [isOpenMore, openMore] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0rem'
      textAreaRef.current.style.height = 
      textAreaRef.current.scrollHeight / 10 + 'rem'
    }
  }, [textAreaRef, message])

  const handleClickMoreButton = () => {
    openMore(!isOpenMore)
  }

  const handleClickEmoji = () => {
    // emojiButtonClick
  }

  const sendMessage = () => {

  }

  return {
    textAreaRef,
    message,
    setMessage,
    isOpenMore,
    handleClickMoreButton,
    sendMessage,
  }
}

export default useChatRoomDetailViewModel