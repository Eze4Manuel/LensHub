@extends('layouts.app')

@section('content')
<style media="screen">
.makeStyles-mainPanel-2{
  padding-bottom: 100px!important;
}
  #app nav {
    box-shadow: 0px 2px 10px #1871dc!important;
    background: midnightBlue!important;
  }
  #app nav .nav-wrapper ul li a{
    color: #1871dc;
  }
  #app nav .nav-wrapper ul li a.shop{
    color: #1871dc;
  }
  .footer{
    display: none;
  }
</style>
    @auth('admin')
      <div id="adminloginview" data-url = @php echo url('/') @endphp ></div>
      <!-- <h1> {{ Auth::guard('admin')->user()->username }} </h1> -->
     @endauth

     @guest('admin')
     <script type="text/javascript">
          window.location.href = "{{ url('/adminlogin') }}";//here double curly bracket
      </script>
      @endguest
@endsection
