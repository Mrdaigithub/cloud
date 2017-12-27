<?php

namespace App\Listeners;

use App\Events\Upload;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use AetherUpload\Receiver;

class UploadListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Upload $event
     * @return void
     */
    public function handle(Upload $event)
    {
        $request = new Request();
        print_r($request->file('file'));
    }
}
