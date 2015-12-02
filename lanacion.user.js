// ==UserScript==
// @name         La Nacion - Remover Registro
// @namespace    http://lbarrios.com.ar/
// @version      0.3
// @description  Remueve el recuadro de registro que aparece al intentar leer una noticia
// @author       lbarrios@lbarrios.com.ar
// @match        http://*.lanacion.com.ar/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

var max = 5;
var timeout = 500;
//var login_signwall_id = "login-signwall";
var login_signwall_id = "iframe-registracion";
var login_signwalls_class = "login";

function insertCss( code ) {
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    // IE
    style.styleSheet.cssText = code;
  } else {
    // Other browsers
    style.innerHTML = code;
  }
  document.getElementsByTagName("head")[0].appendChild( style );
}

function error(){
  console.log("No se pueden encontrar los elementos correspondientes, el script no funcionará.");
}

function remove_id(element_id) {
  // console.log("Intentando remover "+element_id);
  var element = document.getElementById(element_id);
  if (typeof element==='undefined' || element===null) {
    // console.log("No se encuentra "+element_id);
    return false;
  }
  // console.log(element_id+" encontrado, eliminando...");
  element.remove();
}

function hide_login_signwall(){
  // console.log("Intentando hide_login_signwall...");
  /* Remove the "login-signwall" element */
  var login_signwalls = document.getElementsByClassName(login_signwalls_class);
  if (typeof login_signwalls==='undefined' || login_signwalls===null || !login_signwalls.length) {
    return false;
  }
  
  // console.log("Escondiendo signwalls...");
  for (var i = 0; i < login_signwalls.length; i++) {
    login_signwalls[i].setAttribute("style","display: none !important;");
  };
  insertCss("."+login_signwalls_class+"{display: none !important;}");
  return true;
}

function remove_login_signwall(){
  // console.log("Intentando remove_login_signwall...");
  remove_id('responsive');
  /* Remove the "login-signwall" element */
  var login_signwall = document.getElementById(login_signwall_id);
  if (typeof login_signwall==='undefined' || login_signwall===null) {
    return false;
  }
  
  // console.log("Eliminando signwall...");
  var modal_scrollable = login_signwall;
  while(modal_scrollable.parentNode.tagName!="BODY"){
    modal_scrollable = modal_scrollable.parentNode;
  }
  modal_scrollable.remove();
  return true;
}

function remove_misc_1(){
  /* Misc */
  ads = document.getElementById("grv_Ads_parent");
  if (typeof ads==='undefined' || ads===null) {
    return false;
  }

  // console.log("Eliminando misc...");
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
    // console.log("Escondiendo misc2...");
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
    // console.log("Eliminando misc2...");
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

// tryNumber(neutralize_modal_open,max/5,timeout*5);
// tryNumber(hide_login_signwall,max/5,timeout*5);
// tryNumber(hide_misc_2,max/5,timeout*5);
hide_login_signwall();
window.onload = function () {
  remove_id("responsive");
  //tryMax(remove_modal_open,max,timeout);
  tryMax(remove_login_signwall,max,timeout);
  //tryMax(remove_misc_1,max,timeout);
  //tryInfinite(remove_misc_2,timeout*5);
}
