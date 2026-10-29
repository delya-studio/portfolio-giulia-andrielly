import './background.css'


export function Background() {
  return (
    <div className="background">
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
      <div className="wave wave-4"></div>
    </div>
  );
}

{/* 
  import './background.css'

  export function Background({children}) {
    return (
      <div className="background">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="wave wave-4"></div>

        {children}
      </div>
    );
  }
  
*/}