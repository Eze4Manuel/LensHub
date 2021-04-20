@extends('layouts.app')

@section('content')
<div class="container" style="background-image: url('{{ asset("images/logo/backg.jpg")}}')">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
              <div class="img-log">
                <img class="responsive-img" src="{{asset('/images/logo/reset.png')}}" alt="reset">
              </div>
                <div class="card-header">{{ __('Reset Password') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                              <i class="material-icons prefix">email</i>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Send Password Reset Link') }}
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
