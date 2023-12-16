import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed,setnumberAllowed]=useState(false);
  const [charAllowed,setcharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)str+="0123456789"
    if(charAllowed)str+="!@#$%^&*{}[]~`"
    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  function getChange(e){
    setLength(e.target.value);
  }
  function copyToClipboard(){
    window.navigator.clipboard.writeText(password)
  }
  return (
    <>
      <h1>Password generator</h1>
      <div className="container">
        <div className="input-field">
           <input type="text" id="content" defaultValue={password}
          readOnly
           />
        <button id='copy' onClick={copyToClipboard} title='copy button'>copy</button>
        </div>
       <div className="changing-fields">
        <input type="range" name="" id="slider" min="0" max="20" onChange={getChange}/>
       <p> Length ({length})</p>
       <input type="checkbox" name="" id="numbers" 
       defaultChecked={numberAllowed}
       onChange={()=>{
        setnumberAllowed((e)=>!e);
       }}
       />
       <span>Numbers</span>
       <input type="checkbox" name="" id="characters" 
       defaultChecked={charAllowed}
       onChange={()=>{
        setcharAllowed((e)=>!e)
       }}
       />
       <span>Characters</span>

       </div>
      </div>
    </>
  )
}

export default App
