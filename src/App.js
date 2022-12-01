import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch } from 'react-router-dom';


import Editor from './components/Editor'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  // const [css, setCss] = useLocalStorage('css', '')
  // const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const Conversion = "\\";
  
  
  useEffect(() => {
    // function getHTMLFromServer(){
    //   const doc = fetch('http://127.0.0.1:5000/getHTML')
    //    .then(function(response) {
    //       return response.text()
    //   })
    //   .catch(function(err) {
    //   console.log(err);
    //    })
    //    .then(
    //     res => {
    //       setHtml(res)
    //     }
    //   );
    //   console.log(doc)
    //   return doc
    // }
    // getHTMLFromServer()

    const timeout = setTimeout(() => {
      
      setSrcDoc(`
        ${html}
        <style>
        *{
          -moz-user-select:none;/*火狐*/
          -webkit-user-select:none;/*webkit浏览器*/
          -ms-user-select:none;/*IE10*/
          -khtml-user-select:none;/*早期浏览器*/
            user-select:none;
      }
        .selected{
          position:relative;
          cursor:pointer;
          }
       .selected:after{
            }
       .selected:hover:after{
          position:absolute;
          left:0;
          width:100%;
          height:100%;
          background-color:red;
          opacity:.3;
          pointer-events: none;
          content:""
         }
        </style>
        <script>
      
      
   
        function countNum(arr,element){
           let count = 0;
           for(let i=0;i<arr.length;i++){
              if(arr[i]==element){
                count++
              }
           }
           return count
        }

        function getLine(word,wordNum){
          let html = localStorage.getItem("codepen-clone-html");
          let stack =[]
          let line=1;
          for(let i=0;i<html.length;i++){
            //判断首字母相同
            if(word[0]==html[i]){
                      
            //判断字符出现的位置，并限定字符出现在><之间
            if(html.substr(i,word.length)==word&&html[i-1]==">"&&html[i+word.length]=="<"){
                stack.push([i])
                i=i+word.length
            }
           }
          }
          let ch = 0;
          for(let i=0;i<=stack[wordNum];i++){
            if(html[i]!="${Conversion}${Conversion}"){
              ch++
            }
            if(html.substr(i,2)=="${Conversion}${Conversion}n"){
              line++
              ch=0;
           }
          }
          return JSON.stringify({
            line: line-1,
            ch: ch-2+word.length
          })
        }
        
        window.addEventListener('scroll', function() {
          localStorage.setItem("scrollTop", document.documentElement.scrollTop)
        })

        window.onload=function(){
          let stack=[];

          let allEvent = document.getElementsByTagName("*");

          //获取编辑器
          let editor = window.parent.document.querySelector('.CodeMirror').CodeMirror; 
          document.documentElement.scrollTop = localStorage.getItem("scrollTop")
          
          //获取navbar
          let navbar = window.parent.document.getElementsByClassName("navbar")[0]
          let navbarMenu = window.parent.document.getElementsByClassName("nav-menu")[0]
          let menuBars = window.parent.document.getElementsByClassName("menu-bars")[0]

          //防止editor失去焦点
          document.onmousedown=function(event){
            event.preventDefault();
          }
          navbar.onmousedown=function(event){
            event.preventDefault();
          }
          // navbarMenu.onmousedown=function(event){
          //   event.preventDefault();
          // }
          menuBars.onmousedown=function(event){
            event.preventDefault();
          }
          

          for(let i=0;i<allEvent.length;i++){
            //选择内容非空且没有孩子元素的节点
            if(allEvent[i].children.length==0 && allEvent[i].innerHTML!=""){
                stack.push(allEvent[i].innerHTML);
                allEvent[i].classList.add('selected');
                allEvent[i].setAttribute("selectedId",countNum(stack,allEvent[i].innerHTML)-1);   
                allEvent[i].onclick=function(e){
                  
                  //防止失去焦点
                  e.preventDefault();
 
                  //阻止冒泡
                  e.stopPropagation();
                  localStorage.setItem("location",getLine(this.innerHTML,parseInt(this.getAttribute("selectedId"))));    
                  console.log(localStorage.getItem("location"))
                  editor.setCursor(JSON.parse(localStorage.getItem("location")));
              }                
            }          
          
           }                       
          }
          </script>
      `)

    }, 250) 
    
    return () => {
      clearTimeout(timeout)
      // clearInterval(timer)
    }
  }, [html])
 
 return (
  <>
    <Navbar />
     <div id="onlineEditor" className="pane_editor top-pane">
      <Editor
        language="xml"
        displayName="HTML"
        value={html}  
        onChange={setHtml}
      />
    </div>
    <div className="pane_iframe">
      <iframe
        id="iframe"
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts allow-same-origin"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  </>
)
}
 


export default App;
