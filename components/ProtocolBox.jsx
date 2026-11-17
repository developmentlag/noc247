import { useState } from 'react';
import PROTOCOL_TEXT from '../lib/protocol';

export default function ProtocolBox() {
  const [message, setMessage] = useState('');

  async function onCopy() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PROTOCOL_TEXT);
        setMessage('Copied');
        return;
      }
      throw new Error('Clipboard unavailable');
    } catch (error) {
      setMessage('Copy failed. Select the text in the box.');
    }
  }

  return (
    <div className="protocol-box my-8">
      <div className="mb-3 flex flex-wrap items-center gap-4">
        <button type="button" className="btn-secondary !px-4 !py-2 text-sm" onClick={onCopy}>
          Copy
        </button>
        <a className="link-underline" href="/downloads/shift-handover-protocol.txt">
          Download as .txt
        </a>
        <span aria-live="polite" className="text-sm font-semibold text-brand-700">
          {message}
        </span>
      </div>
      <pre className="protocol-box__pre">
        <code>{PROTOCOL_TEXT}</code>
      </pre>
    </div>
  );
}
