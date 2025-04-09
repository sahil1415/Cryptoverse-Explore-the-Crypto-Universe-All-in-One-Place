import React from 'react'
import '../static/footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
            <p className="copy">© {new Date().getFullYear()} Cryptoverse. All rights reserved.</p>
                <p> sahilansari@cryptoverse.com</p>
            </div>
        </footer>

    )
}
export default Footer
Footer