import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

// theme
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/abcdef.css';
import 'codemirror/theme/ambiance-mobile.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/theme/hopscotch.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/liquibyte.css';
import 'codemirror/theme/lucario.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mbo.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/neat.css';
import 'codemirror/theme/neo.css';
import 'codemirror/theme/night.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/theme/paraiso-dark.css';
import 'codemirror/theme/paraiso-light.css';
import 'codemirror/theme/pastel-on-dark.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/seti.css';
import 'codemirror/theme/shadowfox.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/tomorrow-night-eighties.css';
import 'codemirror/theme/ttcn.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/vibrant-ink.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/yeti.css';
import 'codemirror/theme/zenburn.css';
// modes
import 'codemirror/mode/javascript/javascript.js';

import 'codemirror/mode/cmake/cmake.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../../constants';

const Editor = ({ socketRef, RoomId, onCodeChange, selectedTheme }) => {
  const editorRef = useRef(null);
  const CodeMirrorWrapper = useRef(null);

  useEffect(() => {
    function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('collaborativeEditor'),
        {
          mode: {
            name: 'text/x-c++src',
            globalVars: true,
            json: true,
          },
          theme: selectedTheme,
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          multipleCursor: true,
        }
      );

      editorRef.current.on('change', (instance, changes) => {
        console.log('changes', changes);
        // console.log(instance);
        // console.log(origin);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        // console.log(code);
        if (origin !== 'setValue') {
          // console.log('working', code)
          let linenumber = editorRef.current.getCursor();
          // console.log(linenumber)
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            RoomId,
            code,
            linenumber,
          });
        }
      });

      editorRef.current.setValue(
        '#include<iostream>\n\nusing namespace std;\n\nint main()\n{\n  cout<<"Hello World!";\n  return 0;\n}'
      );
    }
    init();
    return () => {
      editorRef.current = null;
    };
  }, []);

  // useEffect(() => {
  //   const div = document.createElement('div');
  //   div.style.position = 'absolute';
  //   div.style.width = '2px';
  //   div.style.height = '25.5px';
  //   div.style.backgroundColor = 'white';
  //   div.style.zIndex = '1000';
  //   div.style.top = '80px';
  //   div.style.left = '21px';
  //   div.innerHTML = `<div
  //   style="width: max-content;background: white;
  //   color: gray;
  //   border-radius : 5px;
  //   transform: translate(-50%,-100%);
  //   padding: 0 5px;"
  //   >name</div>`;
  //   const CodeMirrorWrapper = document.querySelector('.CodeMirror-sizer');
  //   CodeMirrorWrapper.appendChild(div);

  //   return () => {
  //     CodeMirrorWrapper.removeChild(div);
  //   };
  // }, []);

  // const addACursor = (username, ch, line) => {
  //   const div = document.createElement('div');
  //   div.style.position = 'absolute';
  //   div.style.width = '2px';
  //   div.style.height = '25.5px';
  //   div.style.backgroundColor = 'white';
  //   div.style.zIndex = '1000';
  //   div.style.top = '80px';
  //   div.style.left = '21px';
  //   div.innerHTML = `<div
  //   style="width: max-content;background: white;
  //   color: gray;
  //   border-radius : 5px;
  //   transform: translate(-50%,-100%);
  //   padding: 0 5px;"
  //   >name</div>`;
  //   const CodeMirrorWrapper = document.querySelector('.CodeMirror-sizer');
  //   CodeMirrorWrapper.appendChild(div);

  //   setTimeout(() => {
  //     CodeMirrorWrapper.removeChild(div);
  //   },5000);

  // };
  useEffect(() => {
    if (socketRef.current) {
      // console.log('not null')
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code, linenumber,UserName }) => {
        // console.log('receiveing',code);
        console.log('linenumber', linenumber);
        if (!linenumber.line || !linenumber.ch) {
          return;
        }
        document.querySelectorAll('.self-cursors').forEach((cursor) => {
          cursor.remove();
        });

        CodeMirrorWrapper.current = document.querySelector('.CodeMirror-sizer');
        const div = document.createElement('div');
        div.classList = 'self-cursors';
        div.style.position = 'absolute';
        div.style.width = '2px';
        div.style.height = '25.5px';
        div.style.backgroundColor = 'white';
        div.style.zIndex = '1000';
        div.style.top = `${linenumber.line * 26.8}px`;
        div.style.left = `${linenumber.ch * 9.7}px`;
        div.innerHTML = `<div
        style="width: max-content;background: white;
        color: gray;
        border-radius : 5px;
        transform: translate(-50%,-100%);
        padding: 0 5px;"
        >${UserName}</div>`;
        CodeMirrorWrapper.current.appendChild(div);

        setTimeout(() => {
          CodeMirrorWrapper.current.removeChild(div);
        }, 1000);
        // console.log(`<div
        // style={{
        //  left : ${linenumber.ch} * 7,
        //   top : ${linenumber.line} * 20,
        // }}
        // ></div>`);
        if (code !== null) {
          editorRef.current.setValue(code);
          editorRef.current.setCursor({ line: linenumber.line });
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
      // CodeMirrorWrapper.current.removeChild(div);
    };
  }, [socketRef.current]);

  return <textarea id='collaborativeEditor'></textarea>;
};

export default Editor;
