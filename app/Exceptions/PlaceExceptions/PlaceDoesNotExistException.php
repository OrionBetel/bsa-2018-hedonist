<?php

namespace Hedonist\Exceptions\PlaceExceptions;

use Hedonist\Exceptions\DomainException;

class PlaceDoesNotExistException extends DomainException
{
    public function __construct(string $message = 'The place does not exists', $code = 404, \Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}