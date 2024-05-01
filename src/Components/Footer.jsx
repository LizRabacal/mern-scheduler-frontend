import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
      <>
        <footer id='footer'>

          <p>© Liz Rabaçal. Todos os direitos reservados.</p>
          <div className="redes">
            
                  <a target='blank' href="https://github.com/LizRabacal/" ><FaGithub size={40}/></a>
                  <a target='blank' href="https://www.linkedin.com/in/liz-raba%C3%A7al-a5356419a/"><FaLinkedin size={40} /></a>
          </div>
      </footer>
</>
  )
}

export default Footer