<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Box;


class BasicTesters extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    # Test function for Box class
    public function testBoxContents()
    {
      // $box = new Box(['toy']);
      // $this->assertTrue($box-> has('toy'));
      // $this->assertFalse($box->has('ball'));
      $this->visit('/')
             ->see('Laravel')
             ->dontSee('Rails');
    }
}
