import { useState } from 'react';
import { Button } from '@mui/material';

export default function ClickToCopyButton({ text }) {
    const [copied, setCopied] = useState(false);
  
    const handleCopyClick = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  
    return (
      <Button
        variant="contained"
        color={copied ? 'secondary' : 'primary'}
        onClick={handleCopyClick}
      >
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </Button>
    );
  }