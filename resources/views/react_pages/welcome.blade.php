@extends('../layouts.app')

@section('content')
  <div id="home" data-url = @php echo url('/'); @endphp ></div>

  <script>
     $(document).ready(function(){
       $('.slider').slider();
     });
  </script>
@endsection
