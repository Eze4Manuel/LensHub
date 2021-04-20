@extends('layouts.app')

@section('content')
<div class="container" style="background-image: url('{{ asset("images/logo/backg.jpg")}}')">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="img-log">
                  <img class="responsive-img" src="{{asset('/images/logo/login.png')}}" alt="signin">
                </div>
                <div class="card-header">{{ __('ADMIN') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('adminAuthenticate') }}">
                        @csrf

                        @if( $details ?? '')
                        <span class="invalid-feedback red-text" style="margin-left: 10px;" role="alert">
                            <strong>{{ $details }}</strong>
                        </span>
                        @endif
                        <div class="form-group row">
                            <label for="username" class="col-md-4 col-form-label text-md-right">{{ __('Username') }}</label>

                            <div class="col-md-6">
                              <i class="material-icons prefix">person</i>
                                <input style="width: 100%;" id="username" type="username" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>


                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">

                                <i class="material-icons prefix">lock</i>

                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">


                            </div>
                        </div>



                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>


                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
  nav{
    background: #ddd!important;
  }
  .footer{
      display: none;
  }
</style>
@endsection
