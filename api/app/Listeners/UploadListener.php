<?php

namespace App\Listeners;

use App\Events\UploadEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Redis;
use Predis\Connection\ConnectionException;
use App\Models\Resource;

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
     * @return \App\Models\Resource
     */
    public function handle(UploadEvent $event)
    {
        $req = $event->request;
        $saved_path = $event->receiver->savedPath;
        $resource = new Resource();
        $resource->resource_name = $req->only('filename')['filename'];
        $resource->hash = pathinfo($saved_path)['filename'];
        $resource->file = true;
        $resource->path = $req->only('path')['path'];
        $resource->save();
        $req->user()->resource()->attach($resource->id);
        return $resource;
    }
}
