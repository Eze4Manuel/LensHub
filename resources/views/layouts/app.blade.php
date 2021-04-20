<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

    <!--Import Google Icon Font-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Compiled and minified CSS -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
     <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>


    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">



</head>
<body>
    <div id="app">
        <nav>
          <div class="nav-wrapper">
            <a class="brand-logo left" href="{{ url('/') }}">
                <!-- {{ config('app.name', 'Laravel') }} -->
                <img class="responsive-img logo" src="{{ asset('image/logo.png')}}" alt="logo">
            </a>

            <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>

            <ul class="right hide-on-med-and-down">
                <!-- Authentication Links -->
                <li>
                  <a href="/" class="shop">Home </a>
                </li>
                <li>
                  <a href="#"> About </a>
                </li>
                @guest
                    <li>
                        <a class="" href="{{ route('login') }}">{{ __('Rent Gadgets') }}</a>
                    </li>
                    @if (Route::has('register'))
                        <li>
                            <a class="btn" href="{{ route('register') }}">Register</a>
                        </li>
                    @endif
                @else
                <li>
                  <a href="#"> Offers</a>
                </li>
                <li>
                  <a href="/admin/rentgadget"> Rent Gadgets </a>
                </li>
                  <li>
                      <a class='dropdown-trigger' href='#' data-target='dropdown1'>
                       @php
                         $string=  explode(" ", trim(Auth::user()->name, " "));
                         $str1 = substr($string[0], 0, 1); $str2 = substr($string[0], 0, 1);
                         echo $str1."".$str2;
                       @endphp
                     </a>

                     <!-- Dropdown Structure -->
                       <ul id='dropdown1' class='dropdown-content'>
                         <li>
                           <a href="/admin/dashboard"> Dashboard </a>
                         </li>
                         <li>
                           <a href="/admin/user" >Profile </a>
                         </li>
                       <li>
                         <a class="dropdown-item black-text" href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                          document.getElementById('logout-form1').submit();">
                             {{ __('Logout') }}
                         </a>
                         <form id="logout-form1" action="{{ route('logout') }}" method="POST" class="d-none">
                             @csrf
                         </form>
                       </li>

                       </ul>

                  </li>
                @endguest
            </ul>
          </div>
        </nav>


         <ul class="sidenav" id="slide-out">
               <!-- Authentication Links -->
               <li class="close">
                 <a href="#" class="close" id="close"><img class="logo" src="{{asset('image/logo.png')}}" alt="logo"><img src="{{ asset('image/icons/close1.png')}}" alt="close"> </a>
               </li>
               <li>
                 <a href="/" class="home"> Home </a>
               </li>
              <li>
                <a href="#" class="shop">About </a>
              </li>

              @guest
                  <li>
                      <a class="" href="{{ route('login') }}">{{ __('Login') }}</a>
                  </li>
                  @if (Route::has('register'))
                      <li>
                          <a class="" href="{{ route('register') }}">Rent Project</a>
                      </li>
                  @endif
              @else
              <li>
                  <a class='dropdown-trigger' href='#' data-target='dropdown2'>
                   @php
                     $string=  explode(" ", trim(Auth::user()->name, " "));
                     $str1 = substr($string[0], 0, 1); $str2 = substr($string[0], 0, 1);
                     echo $str1."".$str2;
                   @endphp
                 </a>

                  <ul class="slidedown">
                    <li>
                      <a href="/admin/dashboard"> Dashboard </a>
                    </li>
                    <li>
                      <a href="/admin/user" >Profile </a>
                    </li>
                    <li>
                       <a class="dropdown-item" href="{{ route('logout') }}"
                          onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                           {{ __('Logout') }}
                       </a>
                       <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                           @csrf
                       </form>
                     </li>
                   </ul>

              </li>
              @endguest
          </ul>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
    <div id="foot">

    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

         <script type="text/javascript">
            $(document).ready(function(){
              $('.sidenav').slideUp(10);
                $('.sidenav-trigger').click(function(){
                    $('.sidenav').slideToggle(300);
                })
                $('#close').click(function(){
                    $('.sidenav').slideToggle(300);
                })




                $(window).scroll(function() { // check if scroll event happened
                  if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
                    $("#app nav").css({"background-color":   "#f8f8f8"}); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
                    $("#app nav").css({"box-shadow":"0px 1px 4px #1871dc"}); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
                    $("#app nav .nav-wrapper ul li a").css({"color":"#000"})
                    $('#app nav a.sidenav-trigger i').css({"color":"#000"})
                   } else {
                     $("#app nav").css("background-color", "transparent"); // if not, change it back to transparent
                     $("#app nav").css({"box-shadow":"none"}); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
                    $("#app nav .nav-wrapper ul li a").css({"color":"#fff"})
                    $('#app nav a.sidenav-trigger i').css({"color":"#1871dc"})
                     }
                   });


                   $('#app ul.sidenav li ul.slidedown').slideUp(10);
                   var coin = false;
                   $('#app ul.sidenav li a.dropdown-trigger').click((e)=>{
                        if(!coin){
                          $('#app ul.sidenav li a.dropdown-trigger').css({"box-shadow": "none"});
                          coin = true;
                        }  else {
                            $('#app ul.sidenav li a.dropdown-trigger').css({"box-shadow": "0px 1px 1px lightgrey"});
                            coin = false;
                        }
                        $('#app ul.sidenav li ul.slidedown').slideToggle(300);

                   })

                   $('.dropdown-trigger').dropdown();

            });
       </script>

</body>
</html>
