<?php

namespace App\Listeners;

use App\Events\UploadEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Redis;
use Predis\Connection\ConnectionException;
use App\Models\Storage;

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
    }
}
