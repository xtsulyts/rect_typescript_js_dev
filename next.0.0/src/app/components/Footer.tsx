import React from 'react'
 type footerProps = {
    enlaces: string;
 }

function Footer(props: footerProps) {
    return(
        <footer className="footer">
  <div className="content has-text-centered">
    <p>
      <strong>{props.enlaces}</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>.
      The source code is licensed
      <a href="https://opensource.org/license/mit">MIT</a>. The
      website content is licensed
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0//"
        >CC BY NC SA 4.0</a
      >.
    </p>
  </div>
</footer>
    )

}

export default Footer;