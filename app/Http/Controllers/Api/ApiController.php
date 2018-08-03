<?php

namespace Hedonist\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class ApiController extends Controller
{
    protected function successResponse(array $data, int $statusCode = JsonResponse::HTTP_OK) : JsonResponse
    {
        return JsonResponse::create($data, $statusCode);
    }

    protected function errorResponse(array $data, int $statusCode = JsonResponse::HTTP_BAD_REQUEST) : JsonResponse
    {
        return JsonResponse::create($data, $statusCode);
    }
}