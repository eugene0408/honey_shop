import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import AOS from 'aos';

import { createPopper } from '@popperjs/core';
import 'bootstrap';

import 'selectize'


function preloader() {
	window.onload = () =>

		setInterval(function () {
			let p = $('.preloader-wrapper');
			p.css('opacity', 0);
			p.css('visibility', 'hidden');
      
		}, 1500)

}

preloader();


AOS.init();



//  ############ DISPLAYNG GOODS ##################


//Read json file & output goods
function goodsInit(){
	$.getJSON("tovar.json", goodsOut);
};


function goodsOut(data){
	let out = document.querySelector('.s-catalog__items')
	for(let key in data){
		out.innerHTML += `<div class="col-lg-4 col-md-6 d-flex justify-content-center mt-4em">
		<div class="goods-card" data-aos="zoom-in">
		<div class="goods-card__bg">
			<img src="images/dist/svg/card-bg.svg" alt="#" />
		</div>
   
		<div class="goods-card__header">
			<h3>${data[key].name}</h3>
		</div>
   
		<div class="goods-card__image">
			<img src="${data[key].image}" alt="#" />
		</div>
   
		<div class="goods-card__descr-wrapper">
			<div class="goods-card__descr">
			<p>
			<span class="f-left">обєм</span>
			<span class="f-right">${data[key].size}<span>л.</span> </span>
			</p>
			<p>
			<span class="f-left">ціна</span>
			<span class="f-right"> ${data[key].cost} <span>грн</span> </span>
			</p>
			
			</div>
		</div>
   
		<div class="goods-card__button-wrapper">
			<button class="goods-card__button" data-id="${key}">у кошик</button>
		</div>
		</div>
	</div>`
	}


	cardsAnimateDelay() //Animate cards appearing

	
};


let cart = {};

//Button add to cart
$(document).on('click', '.goods-card__button', addToCart) 


function addToCart(){
	let id = $(this).attr('data-id')
	if(cart[id] == undefined){
		cart[id] = 1
	}
	else{
		cart[id]++
	};
	saveCart();
	addMiniCart();

}

// Save cart to local storage
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart))
}


// Display mini cart if there are any items in cart
function addMiniCart(){
	let out = $('.side-cart-wrapper');
	let mainOut = $('.busket-wrapper');
	let num = 0;
	let amount = Object.values(cart);
	for(let i = 0; i < amount.length; i++){
		num += Number(amount[i])
		if(num == 0){
			out.html('')
		}else{
			out.html(`    <div class="side-cart">
			<img src="images/dist/svg/wicker-basket.svg" alt="кошик">
			<div class="cart-amount">${num}</div>
		  </div>`)
		   mainOut.innerText += `<div class="cart-amount">${num}</div>`
		}
	} 

	
}


function loadMiniCart(){
	if(localStorage.getItem('cart')){
		cart = JSON.parse(localStorage.getItem('cart'));
		addMiniCart();
  }
}






// ############ ANIMATIONS #############



function cardsAnimateDelay(){

  let card = document.querySelectorAll('.goods-card')
  let pageWidth = window.innerWidth

  if(pageWidth > 768){

    for(let i = 1; i < card.length; i += 3){
      card[i].setAttribute('data-aos-delay', '100')
    }
  
    for(let i = 2; i < card.length; i += 3){
      card[i].setAttribute('data-aos-delay', '200')
    }
  }else{
    card.forEach(card[i].removeAttribute('data-aos-delay'))
  }

 
};













$('document').ready(function(){
    	// Smooth scrolling between anchors
	let $page = $('html, body');
	$('a[href*="#"]').click(function () {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 700);
		return false;
	});
	
	// Show to top button
	$(window).scroll(function () {
	
		if ($(this).scrollTop() > 1000) {
			$('#to-top').fadeIn();
		} else {
			$('#to-top').fadeOut();
		}
	
	});
	
	// Scroll to top on click
	$('#to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	});
	
	
	// Show & hide mini cart
	$(window).scroll(function () {
	
		if ($(this).scrollTop() > 800) {
			$('.side-cart').fadeIn();
			loadMiniCart();
		} else {
			$('.side-cart').fadeOut();
		}

	});

    

    function sendQuestion(){
      let name = $('.name').val(),
          mail = $('.email').val(),
          message = $('.form-message').val();

      if(name != '' && mail != '' && message != ''){
        $.post(
          'core/question-telegram.php', {
            "user_name": name,
            "user_email": mail,
            "user_message": message
          },
          function(data){
            if(data==1){
              alert("Повідомлення надіслано. Ми відповімо вам найблищим часом")
            }else{
              alert("Помилка надсилання. Спробуйте ще раз.")
            }
          }
        )
      }else{
        alert("Заповніть поля")
      }

    }
    $('.q-button').on('click', sendQuestion)


	// Shop

	goodsInit();  // Show goods on main page
    loadMiniCart();
 



   


})