@extends('layouts.app')

@section('content')
<div class="container" style="background-image: url('{{ asset("images/logo/backg.jpg")}}')">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
              <div class="img-log">
                <img class="responsive-img" src="{{asset('/images/logo/verify.png')}}" alt="reset">
              </div>
                <div class="card-header">{{ __('Verify Your Email Address') }}</div>

                <div class="card-body" style="text-align: center">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('A fresh verification link has been sent to your email address.') }}
                        </div>
                    @endif

                    {{ __('Before proceeding, please check your email for a verification link.') }}
                    {{ __('If you did not receive the email') }},
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}" style="text-align: center">
                        @csrf
                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('click here to request another') }}</button>.
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
