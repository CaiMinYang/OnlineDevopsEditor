import React, { useState ,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import SearchIcon from '@rsuite/icons/Search';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
const fileJson = 
{
	"foldertree": {
		"files": [{
			"name": "README.md",
			"rel_path": "UkVBRE1FLm1k"
		}, {
			"name": "package-lock.json",
			"rel_path": "cGFja2FnZS1sb2NrLmpzb24="
		}, {
			"name": "package.json",
			"rel_path": "cGFja2FnZS5qc29u"
		}],
		"folders": [{
			"files": [{
				"name": "favicon.ico",
				"rel_path": "cHVibGljL2Zhdmljb24uaWNv"
			}, {
				"name": "index.html",
				"rel_path": "cHVibGljL2luZGV4Lmh0bWw="
			}, {
				"name": "logo192.png",
				"rel_path": "cHVibGljL2xvZ28xOTIucG5n"
			}, {
				"name": "logo512.png",
				"rel_path": "cHVibGljL2xvZ281MTIucG5n"
			}, {
				"name": "manifest.json",
				"rel_path": "cHVibGljL21hbmlmZXN0Lmpzb24="
			}, {
				"name": "robots.txt",
				"rel_path": "cHVibGljL3JvYm90cy50eHQ="
			}],
			"folders": [],
			"name": "public",
			"rel_path": "cHVibGlj"
		}, {
			"files": [{
				"name": "Industrial_next.py",
				"rel_path": "c3JjL0luZHVzdHJpYWxfbmV4dC5weQ=="
			}, {
				"name": "index.css",
				"rel_path": "c3JjL2luZGV4LmNzcw=="
			}, {
				"name": "index.js",
				"rel_path": "c3JjL2luZGV4Lmpz"
			}],
			"folders": [{
				"files": [{
					"name": "App.js",
					"rel_path": "c3JjL2NvbXBvbmVudHMvQXBwLmpz"
				}, {
					"name": "Editor.js",
					"rel_path": "c3JjL2NvbXBvbmVudHMvRWRpdG9yLmpz"
				}],
				"folders": [],
				"name": "components",
				"rel_path": "c3JjL2NvbXBvbmVudHM="
			}, {
				"files": [{
					"name": "useLocalStorage.js",
					"rel_path": "c3JjL2hvb2tzL3VzZUxvY2FsU3RvcmFnZS5qcw=="
				}],
				"folders": [],
				"name": "hooks",
				"rel_path": "c3JjL2hvb2tz"
			}],
			"name": "src",
			"rel_path": "c3Jj"
		}],
		"name": "Gazed-enhanced-onlineEditor",
		"rel_path": ""
	},
	"logs": [{
		"hash": "2278e4d7c10412bbdfc93dfb2ba86fd0367f590a",
		"name": "GitHub",
		"time": "2022-11-29 10:53:19 +0800",
		"title": "Add files via upload"
	}, {
		"hash": "5323be333b73cf1b60024523b7e0d925f03fc668",
		"name": "GitHub",
		"time": "2022-11-29 10:34:31 +0800",
		"title": "Add files via upload"
	}],
	"reponame": "Gazed-enhanced-onlineEditor"
}

//对得到的文件结构对象进行遍历

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const cloneCode = (e) => {
	//取消表单的默认提交事件
   
	e.preventDefault();
	let input = document.getElementById("codeInput")

	var data={
     	repodir:input,
	}

	fetch('http://127.0.0.1:5000/repo/clone',{
		method:'POST',
		body:data
	})	
	.then(response => response.json())
	.then(data => console.log(data))

  }

//   const openFile = () => {
//   }

//   const commitCode = () => {

//   }
  useEffect(() => {
	

	//获取文件夹的根dom
    let files = document.getElementsByClassName("Files")[0];
    files.innerHTML = ""
	
	const content = [] 
    const changeFileJsonToArray = (json)=>{
    Object.keys(json).forEach(key =>{
      if(key=="folders"){
        for(let files in json[key]){
        //  console.log(<div key={base64_decode(json[key][files].rel_path)}>{base64_decode(json[key][files].rel_path)}</div>)
        changeFileJsonToArray(json[key][files])
        }
       }
       else if(key == "files"){
        Object.keys(json[key]).forEach(item=>{
            //const dom = <div key={base64_decode(json[key][item].rel_path)}>{base64_decode(json[key][item].rel_path)}</div>
            content.push([base64_decode(json[key][item].rel_path),json[key][item].rel_path])
        })
       } 
    }
       );
  }
  changeFileJsonToArray(fileJson["foldertree"])
  
  const makeFileTree = (array)=>{

	  let structureTree = []
	  let firstNode =  document.createTextNode(fileJson["foldertree"]["name"])
	  files.appendChild(firstNode)

      for(let index in array){
         structureTree.push(array[index][0].split('/'))
       }
	  for(let index in structureTree){
		var file = document.createElement('div'); 	   // 创建节点
		if(structureTree[index].length==1){
		     	file.setAttribute("class", "file");   // 设置属性
			    file.innerText =  structureTree[index][structureTree[index].length-1];   // 设置text值
                files.appendChild(file)
		}
		else{
		 let tmpDom = files
	
		 for(let i=0;i<structureTree[index].length-1;i++){

            if(document.getElementById(structureTree[index][i])){

				tmpDom = document.getElementById(structureTree[index][i])
			}
			file.setAttribute("id", structureTree[index][i])
			file.setAttribute("key", array[index][1])
			file.innerText =  structureTree[index][structureTree[index].length-1];
			tmpDom.append(file)
		 }
		}
	  }
	  let allDom = document.querySelectorAll(".Files *");
	  for(let i=0;i<allDom.length;i++){
	
		if(allDom[i].children.length){
		
            //设置folder节点和file节点的className，方便后续做css渲染
			var file = document.createElement('div'); 
			allDom[i].setAttribute("filename", allDom[i].getAttribute("id"))
			allDom[i].setAttribute("id", allDom[i].getAttribute("key"))
			allDom[i].classList.add('folder');

			//增加未渲染的节点
			file.setAttribute("key", allDom[i].getAttribute("key"))
			file.setAttribute("class", "file")
			file.innerText = allDom[i].firstChild.nodeValue;;
			allDom[i].appendChild(file)

			//将text节点转换为div节点并置顶在folder中
			allDom[i].firstChild.nodeValue=allDom[i].getAttribute("filename")
			let template = allDom[i].firstChild.nodeValue
			let folderHead = document.createElement('div');
			folderHead.innerText = template
			folderHead.setAttribute("class","folderHead")
			folderHead.setAttribute("sw",0)
			allDom[i].removeChild(allDom[i].firstChild)
			allDom[i].insertBefore(folderHead,allDom[i].firstChild)

			
			//将文件夹节点放在text节点后，file节点放在最后，相当于置顶文件夹
			allDom[i].parentNode.insertBefore(allDom[i],allDom[i].parentNode.childNodes[1])
			var symbol = document.createElement('div'); 
		    symbol.setAttribute("class", "symbol");
			allDom[i].firstChild.appendChild(symbol)

		    //文件夹添加点击事件,点击文件夹头则开关文件夹
            allDom[i].firstChild.onclick=()=>{
				if(allDom[i].firstChild.getAttribute("sw") == 1){
				allDom[i].style.maxHeight = "30px"
			    allDom[i].firstChild.setAttribute("sw",0)
				allDom[i].firstChild.childNodes[1].style.transform="rotate(N 0deg)"
			}
			  else{
				allDom[i].style.maxHeight = "300px"
				allDom[i].firstChild.setAttribute("sw",1)
				allDom[i].firstChild.childNodes[1].style.transform="rotate(90deg)"
			  }
				
			}
		}	
		else{

			allDom[i].removeAttribute("id")
			allDom[i].classList.add('file');
		}
          
	  }
   }
  makeFileTree(content)
  })
  

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div className='menu-button'>
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
          <div className="commitCode">
           <AiIcons.AiOutlineCloudUpload />
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
          <ul className='nav-menu-items' >
            <li className='navbar-toggle' onClick={showSidebar}>
              <div to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </div>
            </li>
            <li className='Clone'>
              <form>
               <input type="text" id="codeInput" className="cloneInput" /><button className="cloneButton" onClick={cloneCode}>Code</button>
              </form>
            </li>
            <li className='Files'>
              {/* {content.map((item)=>{
                return item
              })} */}
              {/* {showFIle(fileJson["foldertree"])}
              {testDom()} */}
            </li>
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
