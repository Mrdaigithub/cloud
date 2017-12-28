<?php

namespace App\Listeners;

<<<<<<< HEAD
use App\Events\UploadEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Redis;
use Predis\Connection\ConnectionException;
use App\Models\Storage;
=======
use App\Events\Upload;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use AetherUpload\Receiver;
>>>>>>> 8a12f18c35fe3a28eeebf60b157f8c8f938a59cc

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
<<<<<<< HEAD
     * @param UploadEvent $event
     * @return \App\Models\Storage
     */
    public function handle(UploadEvent $event)
    {
        $saved_path = $event->receiver->savedPath;
        $storage = new Storage();
        $storage->storage_name = $event->filename['filename'];
        $storage->file_hash = pathinfo($saved_path)['filename'];
        $storage->user_id = $event->oneself->id;
        $storage->file = true;
        $storage->save();
        return $storage;
=======
     * @param  Upload $event
     * @return void
     */
    public function handle(Upload $event)
    {
        $request = new Request();
        print_r($request->file('file'));
>>>>>>> 8a12f18c35fe3a28eeebf60b157f8c8f938a59cc
    }
}
