<?php

namespace Hedonist\Actions\User\Follows;

use Illuminate\Support\Collection;

class GetFollowedUsersResponse
{
    private $users;

    public function __construct(Collection $users)
    {
        $this->users = $users;
    }
    public function getUsers(): Collection
    {
        return $this->users;
    }
}