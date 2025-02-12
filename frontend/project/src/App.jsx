import React, { useState } from 'react';
import { Send, Wand2, Download, Chrome } from 'lucide-react';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (emailContent.length === 0) {
      return;
    }
    setIsGenerating(true);
    try {
      // Replace with your backend API endpoint
      const response = await axios.post('https://replygenerator.onrender.com/api/email/generate', {
        emailContent,
        tone,
      });

      setGeneratedReply(response.data);
    } catch (error) {
      console.error('Error generating reply:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <h1 className="title">Email Reply Generator</h1>
          <p className="subtitle">Generate professional email responses in seconds</p>
        </div>

        <div className="card input-card">
          <div className="form-group">
            <label className="label">Email Content to Reply to</label>
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="textarea"
              placeholder="Paste the email content you want to reply to..."
            />
          </div>

          <div className="form-group">
            <label className="label">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="select"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="humorous">Humorous</option>
              <option value="empathetic">Empathetic</option>
              <option value="persuasive">Persuasive</option>
              <option value="authoritative">Authoritative</option>
              <option value="inspirational">Inspirational</option>
              <option value="concise">Concise</option>
              <option value="warm">Warm</option>
              <option value="neutral">Neutral</option>
              <option value="informative">Informative</option>
              <option value="respectful">Respectful</option>
              <option value="sarcastic">Sarcastic</option>
              <option value="supportive">Supportive</option>
              <option value="engaging">Engaging</option>
              <option value="witty">Witty</option>
              <option value="casual-professional">Casual Professional</option>
              <option value="serious">Serious</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="button"
          >
            <Wand2 className={isGenerating ? 'spin' : ''} />
            <span>{isGenerating ? 'Generating...' : 'Generate Reply'}</span>
          </button>
        </div>

        {generatedReply && (
          <div className="card response-card">
            <h2 className="response-title">Generated Response</h2>
            <div className="response-container">
              <textarea
                value={generatedReply}
                readOnly
                className="response-textarea"
              />
              <button
                onClick={handleCopy}
                className="copy-button"
              >
                <Send />
                <span>Copy</span>
              </button>
            </div>
          </div>
        )}

        <div className="card extension-card">
          <div className="extension-header">
            <Chrome className="extension-icon" />
            <h2 className="extension-title">Want to use our Chrome extension?</h2>
          </div>

          <a href="../Downloadable/chromeExtension.zip" download className="download-button">
            <Download />
            <span>Download Extension</span>
          </a>

          <div className="installation-steps">
            <h3 className="steps-title">Installation Steps:</h3>
            <ol className="steps-list">
              <li>Extract the downloaded zip file</li>
              <li>Open <a href="chrome://extensions/" className="chrome-link">chrome://extensions/</a> and turn on Developer mode</li>
              <li>Click on "Load unpacked" and select the extracted folder</li>
              <li>Go to Gmail - you'll see a new "Generate reply" button on clicking "reply"!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;