<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    // public function testBasicTest()
    // {
    //     $response = $this->get('/');
    //
    //       $response->assertStatus(200);
    // }

    # Test function for Box class
    public function testBoxContents()
    {
      // $box = new Box(['toy']);
      // $this->assertTrue($box-> has('toy'));
      // $this->assertFalse($box->has('ball'));

      $this->visit('/')
             ->see('Laracas')
             ->dontSee('Rails');
    }
}
