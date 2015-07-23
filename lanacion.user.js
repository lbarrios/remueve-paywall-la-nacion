// ==UserScript==
// @name         La Nacion - Remover Registro
// @namespace    http://lbarrios.com.ar/
// @version      0.2
// @description  Remueve el recuadro de registro que aparece al intentar leer una noticia
// @author       lbarrios@lbarrios.com.ar
// @match        http://*.lanacion.com.ar/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

var max = 50;
var timeout = 100;

function error(){
  //alert("No se pueden encontrar los elementos correspondientes, el script no funcionará.");
}

function neutralize_modal_open(){
  //console.log("Intentando neutralize_modal_open...");
  /* Neutralize the "modal-open" class effect from anywhere */
  element_class = "modal-open";
  var elements = document.getElementsByClassName(element_class);
  var count = elements.length;
  if (!count) {
    return false;
  }
  
  while(count--){
    //console.log("Neutralizando el efecto de la clase modal-open...");
    var el = elements[count];
    el.style.overflow = "auto";
  }
  return true;
}

function remove_modal_open(){
  //console.log("Intentando remove_modal_open...");
  /* Remove the "modal-open" class from anywhere */
  element_class = "modal-open";
  var elements = document.getElementsByClassName(element_class);
  var count = elements.length;
  if (!count) {
    return false;
  }
  
  while(count--){
    //console.log("Eliminando clase modal-open...");
    var el = elements[count];
    el.classList.remove(element_class);
  }
  return true;
}

function hide_login_signwall(){
  //console.log("Intentando hide_login_signwall...");
  /* Remove the "login-signwall" element */
  element_id = "login-signwall";
  var login_signwall = document.getElementById('login-signwall');
  if (typeof login_signwall==='undefined' || login_signwall===null) {
    return false;
  }
  
  //console.log("Escondiendo signwall...");
  var modal_scrollable = login_signwall.parentNode.parentNode.parentNode;
  modal_scrollable.setAttribute("style","display: none !important;");
  return true;
}

function remove_login_signwall(){
  //console.log("Intentando remove_login_signwall...");
  /* Remove the "login-signwall" element */
  element_id = "login-signwall";
  var login_signwall = document.getElementById('login-signwall');
  if (typeof login_signwall==='undefined' || login_signwall===null) {
    return false;
  }
  
  //console.log("Eliminando signwall...");
  var modal_scrollable = login_signwall.parentNode.parentNode.parentNode;
  modal_scrollable.parentNode.removeChild(modal_scrollable);
  return true;
}

function remove_misc_1(){
  /* Misc */
  ads = document.getElementById("grv_Ads_parent");
  if (typeof ads==='undefined' || ads===null) {
    return false;
  }

  //console.log("Eliminando misc...");
  ads.parentNode.removeChild(ads);
  return true;
}

function hide_misc_2(){
  /* Misc2 */
  element_class = "banner";
  var elements = document.getElementsByClassName(element_class);
  var count = elements.length;
  if (!count) {
    return false;
  }
  while(count--){
    //console.log("Escondiendo misc2...");
    var el = elements[count];
    el.style.display = "none";
  }
  return true;
}

function remove_misc_2(){
  /* Misc2 */
  element_class = "banner";
  var elements = document.getElementsByClassName(element_class);
  var count = elements.length;
  if (!count) {
    return false;
  }
  while(count--){
    //console.log("Eliminando misc2...");
    var el = elements[count];
    el.parentNode.removeChild(el);
  }
  return true;
}

function tryNumber(func,times,timeout){
  func();
  if(times){
    window.setTimeout(function(){
      tryNumber(func,times-1);
    }, timeout);
  }
}

function tryMax(func,times,timeout){
  if(func()){
    return true;
  }
  if(!times){
    error();
  }
  else {
    window.setTimeout(function(){
      tryMax(func,times-1);
    }, timeout);
  }
}

function tryInfinite(func,timeout){
  func();
  window.setTimeout(function(){
    tryInfinite(func);
  }, timeout);
}

tryNumber(neutralize_modal_open,max/5,timeout*5);
tryNumber(hide_login_signwall,max/5,timeout*5);
tryNumber(hide_misc_2,max/5,timeout*5);
window.onload = function () {
  tryMax(remove_modal_open,max,timeout);
  tryMax(remove_login_signwall,max,timeout);
  tryMax(remove_misc_1,max,timeout);
  tryInfinite(remove_misc_2,timeout*5);
}
