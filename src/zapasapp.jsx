/*import Die from "./assets/die"
import React from "react"
import { nanoid } from "nanoid"


export default function App(){
  function randomArray(){
    return new Array(10).fill(0)
    .map(() => ({value:Math.ceil(Math.random() * 6 ),isheld:false,
      id:nanoid()
    }))
  }
  const [dice,setdice] = React.useState(randomArray())
  function reRoll(){
    setdice(randomArray())
  }
function holder(id){
    setdice(preV => preV.map(die => die.id === id ? {...die,isheld:!die.isheld} : die))
  }
  return(
    <main>
      <div className="content">
        {
          dice.map(each => {
            return(
              <Die key={each.id} value={each.value} isheld={each.isheld} onClick={() => holder(each.id)}/>
            )
          }) }
      <button className="roller" onClick={reRoll}>Roll</button>
      </div>
    </main>
  )




}