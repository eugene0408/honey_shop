 // ########### CART ##################
$('document').ready(function(){


let cart = '';  

// Save cart to local storage
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart))
  }


function loadCart(){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
      checkCart()
    }
  }

  function checkCart(){
    
    let out = $('.s-cart__goods-in-cart');

    if(Object.keys(cart).length === 0){
      out.html(`<div class=" mt-10">

      <div class="d-flex justify-content-center align-items-center">
      
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="106px" height="106px" viewBox="0 0 106.059 106.059" style="enable-background:new 0 0 106.059 106.059;"
        xml:space="preserve"><path d="M90.546,15.518C69.858-5.172,36.199-5.172,15.515,15.513C-5.173,36.198-5.171,69.858,15.517,90.547
        c20.682,20.684,54.341,20.684,75.027-0.004C111.23,69.858,111.229,36.2,90.546,15.518z M84.757,84.758
        c-17.494,17.494-45.96,17.496-63.455,0.002c-17.498-17.497-17.496-45.966,0-63.46C38.796,3.807,67.261,3.805,84.759,21.302
        C102.253,38.796,102.251,67.265,84.757,84.758z M77.017,74.001c0.658,1.521-0.042,3.286-1.562,3.943
        c-1.521,0.66-3.286-0.042-3.944-1.562c-2.893-6.689-9.73-11.012-17.421-11.012c-7.868,0-14.747,4.319-17.522,11.004
        c-0.479,1.154-1.596,1.851-2.771,1.851c-0.384,0-0.773-0.074-1.15-0.23c-1.53-0.636-2.255-2.392-1.62-3.921
        c3.71-8.932,12.764-14.703,23.063-14.703C64.174,59.371,73.174,65.113,77.017,74.001z M33.24,38.671
        c0-3.424,2.777-6.201,6.201-6.201c3.423,0,6.2,2.776,6.2,6.201c0,3.426-2.777,6.202-6.2,6.202
        C36.017,44.873,33.24,42.097,33.24,38.671z M61.357,38.671c0-3.424,2.779-6.201,6.203-6.201c3.423,0,6.2,2.776,6.2,6.201
        c0,3.426-2.776,6.202-6.2,6.202S61.357,42.097,61.357,38.671z"/></svg>

      </div>
     

       <h3 style="width: 100%; text-align: center">кошик порожній</h3>
       
      </div>`);
      outTotal();
      hideNextButton();
    }else{
      showCart();
      showNextButton();
    }
  }

  function showCart(){


    $.getJSON('tovar.json', function(data) {

        let out = $('.s-cart__goods-in-cart'),
            goods = data,
            output = ''

            for(let id in cart){

              output += `<div class="row mt-10 ">
    
                <div class="col-md-4 col-sm-5 col-5">
    
                  <div class="s-cart__good">
                
                    <div class="goods-card">
                
                      <div class="goods-card__bg">
                        <img src="images/dist/svg/card-bg.svg" alt="">
                      </div>
                
                      <div class="goods-card__image">
                        <img src="${goods[id].image}" alt="#">
                      </div>
                      
                      <div class="goods-card__header">
                        <h3>${goods[id].name}</h3>
                      </div>
                
                      
                    </div>
                   
                    <div class="goods-card__descr-wrapper">
                      <div class="goods-card__descr">
                
                          <p><span class="f-left">обєм</span> <span  class="f-right"> ${goods[id].size}<span>л.</span> </span></p>
                          <p><span class="f-left">ціна</span> <span class="f-right"> ${goods[id].cost}<span>грн</span> </span></p>
                
                      </div>
                    </div>
                
    
                  </div>
    
                </div>
    
                <div class="col-md-2 col-sm-1 d-sm-flex d-none">
                  <div class="s-cart__math">X</div>
                </div>
    
    
                <div class="col-md-2 offset-md-0 col-sm-1 offset-sm-1 col-2 offset-1 d-flex justify-content-center">
    
                  <div class="s-cart__count">
                  <p class="count-header amount-header">кількість</p>
                    <div class="count">
                      <button class="minus" data-id="${id}">-</button>
                      <div class="number">${cart[id]}</div>
                      <button class="plus" data-id="${id}">+</button>
                    </div>
                  </div>
    
                </div>
    
    
                <div class="col-md-1 d-none d-md-inline-block">
                  <div class="s-cart__math equal">=</div>
                </div>
    
    
    
                <div class="col-md-2 offset-md-0 col-sm-2 col-2">
                  <div class="s-cart__count">
                    <p class="count-header">сума</p>
                    <div class="count">
                      <div class="number sum">${goods[id].cost * cart[id]} <span>грн</span></div>
                    </div>
                  </div>
                </div>
    
    
    
                <div class="col-md-1 col-2 d-flex align-items-center">
                  <button class="s-cart__del" data-id="${id}">
                    <img src="images/dist/svg/trash-white.svg" alt="-">
                  </button>
                </div>
    
              </div>`

    
            };

            out.html(output);
            $('.s-cart__del').on('click', delGood);
            $('.minus').on('click', minusGood);
            $('.plus').on('click', plusGood);
            outTotal();

    });

  }


    function outTotal(){
      let out = $('.total')
      let sum = $('.sum')
      let total = 0
      for(let i = 0; i < sum.length; i++){
        let cost = sum[i].innerHTML.replace('<span>грн</span>', '')
        cost = Number(cost)
        total += cost
      }
        out.html(`<p class="total-header">всього:</p> 
                  <p class="total-number">${total} <span>грн</span></p>`)
      
    }

    function delGood() {
      let id = $(this).attr('data-id');
      delete cart[id];

      saveCart();
      loadCart();
    }

    function minusGood() {
      let id = $(this).attr('data-id');
      if(cart[id] == 1){
        cart[id] = 1
      }else{
        cart[id]--;
      }
    
      saveCart();
      showCart();
    }

    function plusGood() {
      let id = $(this).attr('data-id');
      cart[id]++;

      saveCart();
      showCart();
    }

    function clearCart(){
      cart = {};
      saveCart();
      loadCart();
      
    }

    function showNextButton(){
      let out = $('.order-btn-wrapper');
      out.html('<a class="order-btn" href="cart-mail.html">продовжити</a>')
    }

    function hideNextButton(){
      let out = $('.order-btn-wrapper');
      out.html('')
    }




    $('.s-cart__clear').on('click', clearCart)



   

    $("#select-region").selectize({
		placeholder: "Введіть обл.",
		create: false,
		sortField: "text",
		maxItems: 1,
		allowEmptyOption: true,
	});




    //   // Отправка данных на сервер
    // function send(event, php){
    //     console.log("Отправка запроса");
    //     event.preventDefault ? event.preventDefault() : event.returnValue = false;
    //     var req = new XMLHttpRequest();
    //     req.open('POST', php, true);
    //     req.onload = function() {
    //         if (req.status >= 200 && req.status < 400) {
    //         json = JSON.parse(this.response); // Ебанный internet explorer 11
    //             console.log(json);
                
    //             // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
    //             if (json.result == "success") {
    //                 // Если сообщение отправлено
    //                 alert("Сообщение отправлено");
    //             } else {
    //                 // Если произошла ошибка
    //                 alert("Ошибка. Сообщение не отправлено");
    //             }
    //         // Если не удалось связаться с php файлом
    //         } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
        
    //     // Если не удалось отправить запрос. Стоит блок на хостинге
    //     req.onerror = function() {alert("Ошибка отправки запроса");};
    //     req.send(new FormData(event.target));
    //     }



    function sendEmail(){
        let ename = $('.ename').val(),
            esurname = $('.esurname').val(),
            ephone = $('.ephone').val(),
            email = $('.email').val(),
            eregion = $('.region-select').val(),
            edistrict = $('.edistrict').val(),
            estreet = $('.estreet').val(),
            ecomment = $('.cart-comment').val()

        if(ename !='' && esurname !='' && ephone !=''){
            $.post(
            'core/telegram.php', {
                "ename": ename,
                "esurname": esurname,
                "ephone": ephone,
                "email": email,
                "eregion": eregion,
                "edistrict": edistrict,
                "estreet": estreet,
                "ecomment": ecomment,
                "cart": cart
            },
            function(data){
                if(data == 1){
                location.href = 'thanks.html'
                }else{
                alert("Помилка повторіть замовлення")
                }
            }
            );
        }else{
            alert("Заповніть поля")
        }
    };

    loadCart();

    $('.make-order').on('click', sendEmail)
});