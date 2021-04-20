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
   @auth
    <div id="dashboardindex" data-name = {{ Auth::user()->id }} data-url = @php echo url('/'); @endphp></div>
   @endauth

   @guest
   <script type="text/javascript">
        window.location.href = "{{ url('/login') }}";//here double curly bracket
    </script>

   @endguest
@endsection
