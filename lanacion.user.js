// ==UserScript==
// @name         La Nacion - Remover Registro
// @namespace    http://lbarrios.com.ar/
// @version      0.1
// @description  Remueve el recuadro de registro que aparece al intentar leer una noticia
// @author       lbarrios@lbarrios.com.ar
// @match        http://*.lanacion.com.ar/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

var max = 100;

function error(){
  //alert("No se pueden encontrar los elementos correspondientes, el script no funcionará.");
}

function remove_modal_open(){
  /* Remove the "modal-open" class from anywhere */
  element_class = "modal-open";
  var elements = document.getElementsByClassName(element_class);
  var count = elements.length;
  if (!count) {
    return false;
  }
  
  while(count--){
    console.log("Eliminando clase modal...");
    var el = elements[count];
    el.classList.remove(element_class);
  }
  return true;
}

function remove_login_signwall(){
  /* Remove the "login-signwall" element */
  element_id = "login-signwall";
  var login_signwall = document.getElementById('login-signwall');
  if (typeof login_signwall==='undefined' || login_signwall===null) {
    return false;
  }
  
  console.log("Eliminando signwall...");
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

  console.log("Eliminando misc...");
  ads.parentNode.removeChild(ads);
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
  console.log(elements);
  while(count--){
    console.log("Eliminando misc...");
    var el = elements[count];
    el.parentNode.removeChild(el);
  }
  return true;
}

function tryMax(func,times){
  if(func()){
    return true;
  }
  if(!times){
    error();
  }
  else {
    window.setTimeout(function(){
      tryMax(func,times-1);
    }, 100);
  }
}

function tryInfinite(func){
  func();
  window.setTimeout(function(){
    tryInfinite(func);
  },500);
}

window.onload = function () {
  tryMax(remove_modal_open,max);
  tryMax(remove_login_signwall,max);
  tryMax(remove_misc_1,max);
  tryInfinite(remove_misc_2);
}
