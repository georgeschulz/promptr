import { useState } from 'react';
import { Button } from '@mui/material';

export default function ClickToCopyButton({ text, children, openChat = false }) {
    const [copied, setCopied] = useState(false);
  
    const handleCopyClick = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() =>{
        if (openChat) {
          window.open('https://chat.openai.com/chat');
        }
      }, 500);
      
      setTimeout(() => setCopied(false), 2000);
    };
  
    return (
      <Button
        variant="contained"
        color={copied ? 'secondary' : 'primary'}
        onClick={handleCopyClick}
      >
        {copied ? 'Copied!' : children}
      </Button>
    );
  }