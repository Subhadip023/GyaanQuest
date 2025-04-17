import React ,{useState} from 'react'
import { ImSun } from "react-icons/im";
import { FaRegMoon } from "react-icons/fa";
function Navbar() {
     const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
      );
    
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
    
      };  
  return (
  
 <button className='dark:text-white' onClick={toggleDarkMode}>
{darkMode?<ImSun/>:<FaRegMoon/>}

 </button>


 )
}

export default Navbar