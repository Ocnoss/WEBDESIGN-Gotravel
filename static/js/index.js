$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 4,
        margin: 40, 
        loop: true, 
        nav: true,
        autoplay: true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        dotsEach: 2,
        navText: [
            '<i class="fas fa-angle-double-left"></i>',
            '<i class="fas fa-angle-double-right"></i>'
        ],
        responsive:{
            0:{
                items:1
            },
            650:{
                items:2
            },
            800:{
                items:3
            },
            1000:{
                items:4
            }
        }
    });
});

var map = L.map('map', {
    center: [38, 110],
    zoom: 5,
    maxZoom: 14,
    minZoom: 5,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

///登录/登出处理
function LR(){
    var token = localStorage.getItem('token');

    if (token === null) {
        window.location.href = '/login';
    } else {
        window.location.href = '/';
        localStorage.removeItem('token');
        alert("您已退出");
    }
}

//显示“个人中心” done
function showplace() {
    var element = document.getElementById("personalplace");
    if (element) {
        element.style.display = "block";
    }
}

// 隐藏“个人中心” done
function hideplace() { 
    var element = document.getElementById("personalplace");
    if (element) {
        element.style.display = "none";
    }
}

//页面加载
window.onload = function() {
    var button = document.getElementById("LR"); 
    var token = localStorage.getItem('token');

    if(token === null){  //未登录
        hideplace();
        button.innerHTML = "登录 | 注册";
    }
    else{
        showplace();
        button.innerHTML = "退出登录";
    }
};

function scrollToMap() {
    var mapElement = document.getElementById('map');

    // 使用 scrollIntoView 方法滚动到地图元素
    mapElement.scrollIntoView({
        behavior: 'smooth', // 使用平滑滚动效果
        block: 'center',    // 将地图元素的中心位置滚动到视口中心
    });
}

function randomgo(){
    
    beijingMarker.setOpacity(0);
    shanghaiMarker.setOpacity(0);
    londonMarker.setOpacity(0);
    dushanbeMarker.setOpacity(0);
    newYorkMarker.setOpacity(0);
    tokyoMarker.setOpacity(0);
    scrollToMap();

    var randomNum = Math.floor(Math.random() * 6);

    if (randomNum === 0) {
        beijingMarker.setOpacity(1);
        beijingMarker.openPopup();
        map.setView([39.9042, 116.4074], 10); 
    } else if (randomNum === 1) {
        shanghaiMarker.setOpacity(1);
        shanghaiMarker.openPopup();
        map.setView([31.2304, 121.4737], 10); 
    } else if (randomNum === 2) {
        londonMarker.setOpacity(1);
        londonMarker.openPopup();
        map.setView([51.5074, -0.1278], 10); 
    } else if (randomNum === 3) {
        dushanbeMarker.setOpacity(1);
        dushanbeMarker.openPopup();
        map.setView([38.5737, 68.7730], 10);
    } else if (randomNum === 4) {
        newYorkMarker.setOpacity(1);
        newYorkMarker.openPopup();
        map.setView([40.7128, -74.0060], 10); 
    } else {
        tokyoMarker.setOpacity(1);
        tokyoMarker.openPopup();
        map.setView([35.6895, 139.6917], 10); 
    }

    max.zoom = 12;
}

var customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-map-marker-alt fa-2x"></i>',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
});


var beijingMarker = L.marker([39.9042, 116.4074], { title: '北京', icon: customIcon })
    .addTo(map)
    .bindPopup('<img src= "/static/image/Beijing.jpg" class="popup-image" alt="北京">')
    .setOpacity(0)
    
    .on('mouseover', function (e) {
        this.openPopup();
    })
    .on('mouseout', function (e) {
        this.closePopup();
    })
    .on('click', function (e) {
        window.location.href = "/beijing";
    });

var shanghaiMarker = L.marker([31.2304, 121.4737], { title: '上海', icon: customIcon })
    .addTo(map)
    .bindPopup('<img src= "/static/image/Shanghai.jpg" class="popup-image" alt="上海">')
    .setOpacity(0)

    .on('mouseover', function (e) {
        this.openPopup();
    })
    .on('mouseout', function (e) {
        this.closePopup();
    })
    .on('click', function (e) {
        window.location.href = "/shanghai.html";
    });

// 杜尚别标记
var dushanbeMarker = L.marker([38.5731, 68.7864], { title: '杜尚别', icon: customIcon })
    .addTo(map)
    .bindPopup('<img src= "/static/image/Dusanbe.jpg" class="popup-image" alt="杜尚别">')

    .setOpacity(0)

    .on('mouseover', function (e) {
        this.openPopup();
    })
    .on('mouseout', function (e) {
        this.closePopup();
    })
    .on('click', function (e) {
        window.location.href = "/dusanbe";
    });

    //东京标记
var tokyoMarker = L.marker([35.6895, 139.6917], { title: 'Tokyo', icon: customIcon })
    .addTo(map)
    .bindPopup('<img src= "/static/image/Tokyo.jpg" class="popup-image" alt="东京">')

    .setOpacity(0)

    .on('mouseover', function (e) {
        this.openPopup();
    })
    .on('mouseout', function (e) {
        this.closePopup();
    })
    .on('click', function (e) {
        window.location.href = "/tokyo";
    });


//伦敦标记
var londonMarker = L.marker([51.5074, -0.1278], { title: 'London', icon: customIcon })
    .addTo(map)
    .bindPopup('<img src= "/static/image/London.jpg" class="popup-image" alt="伦敦">')

    .setOpacity(0)

    .on('mouseover', function (e) {
        this.openPopup();
    })
    .on('mouseout', function (e) {
    })
    .on('click', function (e) {
        window.location.href = "/london";
    });


//纽约标记
var newYorkMarker = L.marker([40.7128, -74.0060], { title: 'New York', icon: customIcon })
    .addTo(map)
    .bindPopup('<img src= "/static/image/Newyork.jpg" class="popup-image" alt="纽约">')

    .setOpacity(0)

    .on('mouseover', function (e) {
        this.openPopup();
    })
    .on('mouseout', function (e) {
        this.closePopup();
    })
    .on('click', function (e) {
        window.location.href = "/newyork";
    });

