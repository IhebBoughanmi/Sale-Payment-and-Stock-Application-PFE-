import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import user from "../assets/logo/images.png";
import { IoLogOutOutline} from 'react-icons/io5';

/**
 * @author
 * @function SideMenu
 **/

export const menuItems = [
  
  {
    name: "Acceuil",
    exact: true,
    to: "/",
    iconClassName: "bi bi-house-door",
    
  },

  { 
  name: "Paramétres", 
  exact: true,  
  to: `/par`, 
  iconClassName: "bi bi-gear", 
   subMenus: [
    { name: "Échantillonnage", to: "/"},
    { name: "Articles", to: "/"},
    { name: "Modes de paiement", to: "/par/mpai"},
    { name: "Modes de livraison", to: "/par/mliv"},
  ],
  },

  {
    name: "Comptes",
    exact: true,
    to: `/content`,
    iconClassName: "bi bi-people",
    subMenus: [
      { name: "Ajouter un compte utilisateurs", to: "/content/ajoutcmpt"},
      { name: "consulter comptes utilisateurs", to: "/content/conscompt"},
      
    ],
  },

  { 
    name: "Ventes", 
    exact: true,
    to: `/vent`, 
    iconClassName: "bi bi-bag",
    subMenus: [
    { name: "Gestion des commandes", to: "/" },
    { name: "Gestion des factures", to: "/" },
  ],
},

  {
    name: "livraison",
    exact: true,
    to: `/stock`,
    iconClassName: "bi bi-truck",
  },

 
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);
  const [activation,setActivation]=useState("");
  const [expand, setExpand] = useState(false);


  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  const onTrigger = (data) => {
    if(data!==props.active && data!=="Paramétres" && data!=="Comptes"){
      props.parentCallback(data);
    }
}
const [iduser, setiduser] = React.useState('');
const [acctype, setacctype] = React.useState('');
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
onTrigger(activation);
var token=localStorage.getItem('token');
;
 var decodedidentifiant=jwt_decode(token).identifiant ;
 var acctype=jwt_decode(token).acctype;
 setiduser(decodedidentifiant)
 setacctype(acctype)
  }, [activation,props.active]);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo" style={{width:'100%', height:"60px"}}>
          <img src='http://www.arabsoft.com.tn/smart/themes/default/assets/img/logo_svg.svg?fbclid=IwAR2GyFat_PStujaT-1UEXgAvGxcEa7e2DFgNeAcPwvkZ-8NY48yKt67liEo' alt="webscript"  />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <li onClick={(e) => {
              if (inactive) {
                setInactive(false);
              }
              onTrigger(menuItem.name);
            }}>
    <a
      onClick={() => {
         setExpand((e) => !e);
       }}
      className={`menu-item`}
    >
      <div className="menu-icon">
        <i class={menuItem.iconClassName}></i>
      </div>
      <span>{menuItem.name}</span>
    </a>
    {menuItem.subMenus && (menuItem.subMenus).length > 0 ? (
      <ul className={`sub-menu`}>
        {(menuItem.subMenus).map((menu, index) => (
          <li  key={index} onClick={(e) => {
            setActivation(menu.name)
          }
          }>
            <a >{menu.name}</a>
          </li>
        ))}
      </ul>
    ) : null}
    </li>
        ))}  
          <a
    href="/"  
      className={`menu-item`}
    >
        <div className="menu-icon">     
        <li><IoLogOutOutline/></li></div>
        <span>Déconnexion</span> </a>       
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
        <h5>{acctype}</h5>
          <p>{"Id: "}{iduser}</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;