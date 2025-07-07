


export default function Die(props){
  return(
    <button className="die" 
    style={{backgroundColor : props.isheld ? "#59E391":"white"}} 
    onClick={props.onClick} 
    aria-label={`Die with value ${props.value},${props.isheld ? "held":"not held"}`}
    aria-pressed={props.isheld}
    >{props.value}</button>
  )
}