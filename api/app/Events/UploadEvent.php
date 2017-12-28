<?php

namespace App\Events;

use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UploadEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $receiver;
    public $oneself;
    public $filename;

    /**
     * UploadEvent constructor.
     *
     * @param $receiver
     * @param $oneself
     * @param $filename
     */
    public function __construct($receiver, $oneself, $filename)
    {
        $this->receiver = $receiver;
        $this->oneself = $oneself;
        $this->filename = $filename;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return PrivateChannel
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
