/**
 * @license MIT
 * @copyright codewithsadee 2023 All rights reserved
 * @author omonjon <omonjons077@gmail.com>
 */ "use strict";import{fetchData as e,url as s}from"./api.js";import*as a from"./module.js";let addEventOnElements=function(e,s,a){for(let t of e)t.addEventListener(s,a)},searchView=document.querySelector("[data-search-view]"),searchTogglers=document.querySelectorAll("[data-search-toggler]"),toggleSearch=()=>searchView.classList.toggle("active");addEventOnElements(searchTogglers,"click",toggleSearch);let searchField=document.querySelector("[data-search-field]"),searchResult=document.querySelector("[data-search-result]"),searchTimeout=null,serachTimeoutDuration=500;searchField.addEventListener("input",function(){clearTimeout(searchTimeout),searchField.value?searchField.classList.add("searching"):(searchResult.classList.remove("active"),searchResult.innerHTML="",searchField.classList.remove("searching")),searchField.value&&(searchTimeout=setTimeout(()=>{e(s.geo(searchField.value),function(e){searchField.classList.remove("searching"),searchResult.classList.add("active"),searchResult.innerHTML=`
          <ul class="view-list" data-search-list></ul>
        `;let s=[];for(let{name:a,lat:t,lon:l,country:i,state:c}of e){let r=document.createElement("li");r.classList.add("view-item"),r.innerHTML=`
            <span class="m-icon">location_on</span>

            <div>
              <p class="item-title">${a}</p>

              <p class="label-2 item-subtitle">${c||""} ${i}</p>
            </div>

            <a href="#/weather?lat=${t}&lon=${l}" class="item-link has-state" aria-label="${a} weather" data-search-toggler></a>
          `,searchResult.querySelector("[data-search-list]").appendChild(r),s.push(r.querySelector("[data-search-toggler]"))}addEventOnElements(s,"click",function(){toggleSearch(),searchResult.classList.remove("active")})})},500))});let container=document.querySelector("[data-container]"),loading=document.querySelector("[data-loading]"),currentLocationBtn=document.querySelector("[data-current-location-btn]"),errorContent=document.querySelector("[data-error-content]");export const updateWeather=function(t,l){loading.style.display="grid",container.style.overflowY="hidden",container.classList.remove("fade-in"),errorContent.style.display="none";let i=document.querySelector("[data-current-weather]"),c=document.querySelector("[data-highlights]"),r=document.querySelector("[data-hourly-forecast]"),n=document.querySelector("[data-5-day-forecast]");i.innerHTML="",c.innerHTML="",r.innerHTML="",n.innerHTML="","#/current-location"===window.location.hash?currentLocationBtn.setAttribute("disabled",""):currentLocationBtn.removeAttribute("disabled"),e(s.currentWeather(t,l),function(d){let{weather:o,dt:h,sys:{sunrise:p,sunset:u},main:{temp:m,feels_like:g,pressure:v,humidity:y},visibility:b,timezone:w}=d,[{description:L,icon:f}]=o,T=document.createElement("div");T.classList.add("card","card-lg","current-weather-card"),T.innerHTML=`
      <h2 class="title-2 card-title">Now</h2>

      <div class="weapper">
        <p class="heading">${parseInt(m)}&deg;<sup>c</sup></p>

        <img src="./assets/images/weather_icons/${f}.png" width="64" height="64" alt="${L}"
          class="weather-icon">
      </div>

      <p class="body-3">${L}</p>

      <ul class="meta-list">

        <li class="meta-item">
          <span class="m-icon">calendar_today</span>

          <p class="title-3 meta-text">${a.getDate(h,w)}</p>
        </li>

        <li class="meta-item">
          <span class="m-icon">location_on</span>

          <p class="title-3 meta-text" data-location></p>
        </li>

      </ul>
    `,e(s.reverseGeo(t,l),function([{name:e,country:s}]){T.querySelector("[data-location]").innerHTML=`${e}, ${s}`}),i.appendChild(T),e(s.airPollution(t,l),function(e){let[{main:{aqi:s},components:{no2:t,o3:l,so2:i,pm2_5:r}}]=e.list,n=document.createElement("div");n.classList.add("card","card-lg"),n.innerHTML=`
        <h2 class="title-2" id="highlights-label">Todays Highlights</h2>

        <div class="highlight-list">

          <div class="card card-sm highlight-card one">

            <h3 class="title-3">Air Quality Index</h3>

            <div class="wrapper">

              <span class="m-icon">air</span>

              <ul class="card-list">

                <li class="card-item">
                  <p class="title-1">${r.toPrecision(3)}</p>

                  <p class="label-1">PM<sub>2.5</sub></p>
                </li>

                <li class="card-item">
                  <p class="title-1">${i.toPrecision(3)}</p>

                  <p class="label-1">SO<sub>2</sub></p>
                </li>

                <li class="card-item">
                  <p class="title-1">${t.toPrecision(3)}</p>

                  <p class="label-1">NO<sub>2</sub></p>
                </li>

                <li class="card-item">
                  <p class="title-1">${l.toPrecision(3)}</p>

                  <p class="label-1">O<sub>3</sub></p>
                </li>

              </ul>

            </div>

            <span class="badge aqi-${s} label-${s}" title="${a.aqiText[s].message}">
              ${a.aqiText[s].level}
            </span>

          </div>

          <div class="card card-sm highlight-card two">

            <h3 class="title-3">Sunrise & Sunset</h3>

            <div class="card-list">

              <div class="card-item">
                <span class="m-icon">clear_day</span>

                <div>
                  <p class="label-1">Sunrise</p>

                  <p class="title-1">${a.getTime(p,w)}</p>
                </div>
              </div>

              <div class="card-item">
                <span class="m-icon">clear_night</span>

                <div>
                  <p class="label-1">Sunset</p>

                  <p class="title-1">${a.getTime(u,w)}</p>
                </div>
              </div>

            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">Humidity</h3>

            <div class="wrapper">
              <span class="m-icon">humidity_percentage</span>

              <p class="title-1">${y}<sub>%</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">Pressure</h3>

            <div class="wrapper">
              <span class="m-icon">airwave</span>

              <p class="title-1">${v}<sub>hPa</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">Visibility</h3>

            <div class="wrapper">
              <span class="m-icon">visibility</span>

              <p class="title-1">${b/1e3}<sub>km</sub></p>
            </div>

          </div>

          <div class="card card-sm highlight-card">

            <h3 class="title-3">Feels Like</h3>

            <div class="wrapper">
              <span class="m-icon">thermostat</span>

              <p class="title-1">${parseInt(g)}&deg;<sup>c</sup></p>
            </div>

          </div>

        </div>
      `,c.appendChild(n)}),e(s.forecast(t,l),function(e){let{list:s,city:{timezone:t}}=e;for(let[l,i]of(r.innerHTML=`
        <h2 class="title-2">Today at</h2>

        <div class="slider-container">
          <ul class="slider-list" data-temp></ul>

          <ul class="slider-list" data-wind></ul>
        </div>
      `,s.entries())){if(l>7)break;let{dt:c,main:{temp:d},weather:o,wind:{deg:h,speed:p}}=i,[{icon:u,description:m}]=o,g=document.createElement("li");g.classList.add("slider-item"),g.innerHTML=`
          <div class="card card-sm slider-card">

            <p class="body-3">${a.getHours(c,t)}</p>

            <img src="./assets/images/weather_icons/${u}.png" width="48" height="48" loading="lazy" alt="${m}"
              class="weather-icon" title="${m}">

            <p class="body-3">${parseInt(d)}&deg;</p>

          </div>
        `,r.querySelector("[data-temp]").appendChild(g);let v=document.createElement("li");v.classList.add("slider-item"),v.innerHTML=`
        <div class="card card-sm slider-card">

          <p class="body-3">${a.getHours(c,t)}</p>

          <img src="./assets/images/weather_icons/direction.png" width="48" height="48" loading="lazy" alt="direction"
            class="weather-icon" style="transform: rotate(${h-180}deg)">

          <p class="body-3">${parseInt(a.mps_to_kmh(p))} km/h</p>

        </div>
        `,r.querySelector("[data-wind]").appendChild(v)}n.innerHTML=`
        <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>

        <div class="card card-lg forecast-card">
          <ul data-forecast-list></ul>
        </div>
      `;for(let y=7,b=s.length;y<b;y+=8){let{main:{temp_max:w},weather:L,dt_txt:f}=s[y],[{icon:T,description:S}]=L,q=new Date(f),_=document.createElement("li");_.classList.add("card-item"),_.innerHTML=`
          <div class="icon-wrapper">
            <img src="./assets/images/weather_icons/${T}.png" width="36" height="36" alt="${S}"
              class="weather-icon" title="${S}">

            <span class="span">
              <p class="title-2">${parseInt(w)}&deg;</p>
            </span>
          </div>

          <p class="label-1">${q.getDate()} ${a.monthNames[q.getUTCMonth()]}</p>

          <p class="label-1">${a.weekDayNames[q.getUTCDay()]}</p>
        `,n.querySelector("[data-forecast-list]").appendChild(_)}loading.style.display="none",container.style.overflowY="overlay",container.classList.add("fade-in")})})};export const error404=()=>errorContent.style.display="flex";let currentYear=new Date().getFullYear();document.getElementById("current-year").textContent=currentYear;