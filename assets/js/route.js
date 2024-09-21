/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright Omonjon 2023 All rights reserved
 * @author Omonjon <omonjons077@gmail.com>
 */ "use strict";import{updateWeather as t,error404 as o}from"./app.js";let defaultLocation="#/weather?lat=41.2646&lon=69.2163";console.log(defaultLocation);let currentLocation=function(){window.navigator.geolocation.getCurrentPosition(o=>{let{latitude:e,longitude:a}=o.coords;t(`lat=${e}`,`lon=${a}`)},t=>{window.location.hash=defaultLocation})},searchedLocation=o=>t(...o.split("&")),routes=new Map([["/current-location",currentLocation],["/weather",searchedLocation]]),checkHash=function(){let t=window.location.hash.slice(1),[e,a]=t.includes?t.split("?"):[t];routes.get(e)?routes.get(e)(a):o()};window.addEventListener("hashchange",checkHash),window.addEventListener("load",function(){window.location.hash?checkHash():window.location.hash="#/current-location"});