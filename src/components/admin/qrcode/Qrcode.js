import { useHistory } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import "./qrcode.css";
function Menucode() {
  const history = useHistory();
  const faireRedirection = () => {
    let url = "/admin/Gestion_commerciale";
    history.push(url);
  };

  return (
    <div className="Container">
      <div className="Qrcode-header">
        <h1>Menu QR Code</h1>
      </div>
      <div className="nom">Menu Mustang</div>
      <div className="Gestioncommercial">
        <div className="QrcodeContent">
          <a href="https://mustangsite-760db.web.app/carte">
            <img
              src="https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDsdf2ngwtgyCcvqn%252FkPoGT48k7Zb06ksS6dOfTPoertTzMiq4Mgk2nDSwvLctSifg2zt1jZfioVDZrg9J7xZsgipG1vXtcwqDtWRjOLVY9iAp2%252F86Th7zwth0m1q4n%252FFGwlGCamn%252Fjz%252B65uVvSvEfUdrXAB2cQzqCuvupab%252BgZSOwsMx%252BKvXLYMxGsLPv6zmlA8jCln8F%252BYM8dgn5AGa4yk%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJsq9YvdmklPzyFqfa4xMRNgg8RZnbXWr%252F0he1Zq5qyYEzg%253D%253D"
              alt="QR Code"
            />
          </a>
        </div>
        <div className="societe_button">
          <a
            href={
              "https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1zqoOPAufHCjI4ccbj8leQIffpWitL50YSc%252FcPVAqhvQcY8L%252ByEXXE2GKn8SsxpZk4WZaQp7PKE7yfTgH2P3e9CKW00WL5%252F1cMS7FElOQtZuX8mpOG0vfXH1R11ooGrRdY%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJsp9Y9pz9bzci%252BPpQiStfIuZqvkkFeDMoAnPhUMKrFw%252FRA%253D%253D"
            }
            target="_blank"
            download
          >
            <button className="reg_button" type="submit">
              Télecharger
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Menucode;
