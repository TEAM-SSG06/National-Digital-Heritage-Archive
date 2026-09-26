import React, { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { sfx } from "@/utils/soundEffects";

import { getTranslation } from "@/utils/translations";

interface OnScreenKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  enterLabel?: string;
  currentLanguage?: string;
}

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({
  value,
  onChange,
  onEnter,
  enterLabel = "Search ↵",
  currentLanguage = "english",
}) => {
  const t = getTranslation(currentLanguage);
  const keyboardRef = useRef<any>(null);
  const [layout, setLayout] = useState<"default" | "shift" | "numbers">("default");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    keyboardRef.current?.setInput(value);
  }, [value]);

  const handleChange = (input: string) => {
    onChange(input);
  };

  const handleKeyPress = (button: string) => {
    // Play mechanical keyboard sound effect
    if (button === "{space}") {
      sfx.playKeyClick("space");
    } else if (button === "{enter}") {
      sfx.playKeyClick("enter");
      onEnter?.();
    } else if (button === "{backspace}") {
      sfx.playKeyClick("backspace");
    } else {
      sfx.playKeyClick("standard");
    }

    if (button === "{shift}" || button === "{lock}") {
      setLayout((prev) => (prev === "shift" ? "default" : "shift"));
    } else if (button === "{numbers}") {
      setLayout("numbers");
    } else if (button === "{abc}") {
      setLayout("default");
    }
  };

  const layouts = {
    default: [
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "{shift} z x c v b n m {backspace}",
      "{numbers} {space} {enter}",
    ],
    shift: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "{shift} Z X C V B N M {backspace}",
      "{numbers} {space} {enter}",
    ],
    numbers: [
      "1 2 3 4 5 6 7 8 9 0",
      "- / : ; ( ) $ & @ \"",
      "# % ^ * + = [ ] { }",
      "{abc} {space} {enter}",
    ],
  };

  const display = {
    "{backspace}": "⌫",
    "{enter}":     enterLabel,
    "{space}":     "Space",
    "{shift}":     layout === "shift" ? "⇧ ON" : "⇧",
    "{lock}":      "⇪",
    "{numbers}":   "123",
    "{abc}":       "ABC",
  };

  return (
    <div className="kiosk-keyboard-wrap">
      {/* Toggle visibility handle */}
      <button
        onClick={() => setVisible((v) => !v)}
        className="kiosk-keyboard-toggle"
        aria-label={visible ? t.hideKeyboard : t.showKeyboard}
      >
        {visible ? t.hideKeyboard : t.showKeyboard}
      </button>

      {visible && (
        <div className="kiosk-keyboard">
          <Keyboard
            keyboardRef={(r) => { (keyboardRef as any).current = r }}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            layout={layouts}
            layoutName={layout}
            display={display}
            disableButtonHold
            theme="hg-theme-default kiosk-theme"
          />
        </div>
      )}

      {/* Inline CSS for kiosk keyboard styling */}
      <style>{`
        .kiosk-keyboard-wrap {
          margin-top: 10px;
        }
        .kiosk-keyboard-toggle {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-family: monospace;
          font-weight: 600;
          color: hsl(var(--muted-foreground));
          background: hsl(var(--muted) / 0.5);
          border: 1px solid hsl(var(--border));
          border-radius: 999px;
          padding: 4px 12px;
          cursor: pointer;
          margin-bottom: 8px;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .kiosk-keyboard-toggle:hover {
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
        }
        .kiosk-keyboard {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          border: 1px solid hsl(var(--border));
        }
        .kiosk-keyboard .hg-theme-default {
          background: hsl(var(--muted) / 0.6);
          border-radius: 16px;
          padding: 10px 12px;
          backdrop-filter: blur(8px);
          gap: 6px;
          font-family: inherit;
        }
        .kiosk-keyboard .hg-row {
          display: flex;
          gap: 5px;
          justify-content: center;
          margin-bottom: 5px;
        }
        .kiosk-keyboard .hg-button {
          height: 46px;
          min-width: 42px;
          flex: 1;
          border-radius: 10px;
          background: white;
          border: 1px solid hsl(var(--border));
          box-shadow: 0 2px 4px rgba(0,0,0,0.07);
          font-size: 15px;
          font-weight: 600;
          color: hsl(var(--foreground));
          cursor: pointer;
          transition: all 0.12s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kiosk-keyboard .hg-button:hover {
          background: hsl(var(--primary) / 0.08);
          border-color: hsl(var(--primary) / 0.4);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.10);
        }
        .kiosk-keyboard .hg-button:active {
          transform: translateY(0) scale(0.96);
          box-shadow: 0 1px 2px rgba(0,0,0,0.08);
          background: hsl(var(--primary) / 0.12);
        }
        /* Special keys */
        .kiosk-keyboard .hg-button[data-skbtn="{enter}"] {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          font-size: 13px;
          font-weight: 700;
          min-width: 100px;
          flex: 2;
          letter-spacing: 0.02em;
        }
        .kiosk-keyboard .hg-button[data-skbtn="{enter}"]:hover {
          background: hsl(var(--primary) / 0.88);
          border-color: transparent;
        }
        .kiosk-keyboard .hg-button[data-skbtn="{backspace}"] {
          background: hsl(var(--destructive) / 0.08);
          color: hsl(var(--destructive));
          border-color: hsl(var(--destructive) / 0.25);
          font-size: 16px;
        }
        .kiosk-keyboard .hg-button[data-skbtn="{space}"] {
          flex: 5;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: hsl(var(--muted-foreground));
        }
        .kiosk-keyboard .hg-button[data-skbtn="{shift}"],
        .kiosk-keyboard .hg-button[data-skbtn="{numbers}"],
        .kiosk-keyboard .hg-button[data-skbtn="{abc}"],
        .kiosk-keyboard .hg-button[data-skbtn="{lock}"] {
          background: hsl(var(--muted));
          color: hsl(var(--muted-foreground));
          font-size: 12px;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default OnScreenKeyboard;
