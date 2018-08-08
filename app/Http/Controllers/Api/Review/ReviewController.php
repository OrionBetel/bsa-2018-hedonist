<?php

namespace Hedonist\Http\Controllers;

use Hedonist\Actions\Review\{
    GetReviewAction,
    UpdateReviewAction,
    CreateReviewAction,
    DeleteReviewAction,
    GetReviewCollectionAction
};
use Hedonist\Actions\Review\{
    GetReviewRequest,
    UpdateReviewRequest,
    CreateReviewRequest,
    DeleteReviewRequest
};
use Hedonist\Http\Requests\SaveReviewRequest;
use Hedonist\Http\Controllers\Api\ApiController;

class ReviewController extends ApiController
{
    private $getReviewAction;
    private $updateReviewAction;
    private $createReviewAction;
    private $deleteReviewAction;
    private $getReviewCollectionAction;

    public function __construct(
        GetReviewAction $getReviewAction,
        UpdateReviewAction $updateReviewAction,
        CreateReviewAction $createReviewAction,
        DeleteReviewAction $deleteReviewAction,
        GetReviewCollectionAction $getReviewCollectionAction
    ) {
        $this->getReviewAction = $getReviewAction;
        $this->updateReviewAction = $updateReviewAction;
        $this->createReviewAction = $createReviewAction;
        $this->deleteReviewAction = $deleteReviewAction;
        $this->getReviewCollectionAction = $getReviewCollectionAction;
    }

    public function getReview(int $id)
    {
        try {
            $getReviewResponse = $this->getReviewAction->execute(
                new GetReviewRequest($id)
            );
            return $this->successResponse($getReviewResponse->getReview());
        } catch (\LogicException $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }

    public function getReviewCollection()
    {
        $getReviewCollectionResponse = $this->getReviewCollectionAction->execute();
        return $this->successResponse($getReviewCollectionResponse->getReviewCollection());
    }

    public function createReview(SaveReviewRequest $request)
    {
        try {
            $createReviewResponse = $this->createReviewAction->execute(
                new CreateReviewRequest(
                    $request->input('user_id'),
                    $request->input('place_id'),
                    $request->input('description')
                )
            );
            return $this->successResponse($createReviewResponse->getModel());
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    public function updateReview(SaveReviewRequest $request, $id)
    {
        try {
            $updateReviewResponse = $this->updateReviewAction->execute(
                new UpdateReviewRequest(
                    $request->input('user_id'),
                    $request->input('place_id'),
                    $request->input('description')
                ),
                $id
            );
            return $this->successResponse($updateReviewResponse->getModel());
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    public function deleteReview($id)
    {
        $this->deleteReviewAction->execute(
            new DeleteReviewRequest($id)
        );
        return $this->successResponse([], 200);
    }
}
