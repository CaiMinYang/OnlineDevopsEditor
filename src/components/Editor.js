import React from 'react';
//codemirror样式
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

//codemirror支持js和css的组件
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'

//搜索和跳转功能
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

//代码高亮
import 'codemirror/addon/selection/active-line';

import { Controlled as ControlledEditor } from 'react-codemirror2'


export default function Editor(props) {
  const {
    language,
    value,
    onChange,
  } = props

  function handleChange(editor, data, value) {
    // console.log(value)
    onChange(value)

  }
  
  return (
    <div className={`editor-container`}>
      <ControlledEditor

        onBeforeChange={handleChange}
        value={value}
        autoScroll="true"
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
          autofocus: true,
          focus: true,
          styleActiveLine: true,
          styleActiveSelected: true,
          showCursorWhenSelecting: true
        }}
      />
    </div>
  )
}
