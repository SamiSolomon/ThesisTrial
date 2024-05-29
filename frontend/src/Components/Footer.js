import React from 'react'
import "./footerStyles.css"
 const Footer = () => {
  return (
    <div className='footer'>
        <div className='top'>
           <div>
            <h1>Hospital Information</h1>
            <p>Get the information  and location of the Hospitals.</p>
           </div>
       </div> 
             <div className='bottom'>
              <div>
                <h2>Services</h2>
                <a href='/'>Conditions</a>
                <a href='/'>Listings</a>
                <a href='/'>What we offer</a>
                <a href='/'>How it Works</a>
                <a href='/'>Latest News</a>
                 </div>
                 <div>
                <h2>Useful Links</h2>
                <a href='http://localhost:3000/About'>About</a>
                <a href='http://localhost:3000/service'>Services</a>
                <a href='http://localhost:3000/Hospital'>Hospitals</a>
                <a href='http://localhost:3000/Contact'>Contact</a>
             </div>
             <div>
              <h2>Follow us</h2>
              <a href='/'>Facebook</a>
              <a href='/'>Telegram</a>
              <a href='/'>whatsapp</a>
              <a href='/'>Twitter</a>
              <a href='/'>Instagram</a>
            </div>

             <div>
              <h2>Contact Us</h2>
            <a href='/'>firii9@gmail.com</a>
            <a href='/'>+251978796545</a>
            </div>

            <hr></hr>
          <div className='sb-foorer-below'>
  
          </div>
           
         </div>
        
     </div>
     
  )
}
export default Footer;