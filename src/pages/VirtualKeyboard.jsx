import React from "react";
import "../css/VirtualKeyboard.css";

export default function VirtualKeyboard(props) {
    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', "Backspace"];
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', "Enter"];
    const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    function createRow(codes) {
        return codes.map((code, i) =>
            (<button
                key={i}
                onClick={(event) => dispatchKeyEvent(code)}
            >
                {code}
            </button>)
        );
    }

    function createKeyboard() {
        return [row1, row2, row3].map((row, i) =>
            (<div
                className="virtual-keyboard-row"
                key={`row${i}`}
            >
                {createRow(row)}
            </div>));
    }

    function dispatchKeyEvent(code) {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: code }))
    }

    const keys = createKeyboard();

    return (<div className="virtual-keyboard">
        {keys}
    </div>);
}