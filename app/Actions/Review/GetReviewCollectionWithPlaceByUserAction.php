<?php

namespace Hedonist\Actions\Review;

use Hedonist\Repositories\Review\Criterias\AddPlaceToReviewCriteria;
use Hedonist\Repositories\Review\Criterias\DefaultSortCriteria;
use Hedonist\Repositories\Review\Criterias\GetReviewsByUserCriteria;
use Hedonist\Repositories\Review\Criterias\ReviewPaginationCriteria;
use Hedonist\Repositories\Review\ReviewRepositoryInterface;

class GetReviewCollectionWithPlaceByUserAction
{
    private $reviewRepository;

    public function __construct(ReviewRepositoryInterface $repository)
    {
        $this->reviewRepository = $repository;
    }

    public function execute(GetReviewCollectionWithPlaceByUserRequest $request): GetReviewCollectionWithPlaceByUserResponse
    {
        $page = $request->getPage();
        $userId = $request->getUserId();
        $reviews = $this->reviewRepository->findCollectionByCriterias(
            new GetReviewsByUserCriteria($userId),
            new ReviewPaginationCriteria($page),
            new AddPlaceToReviewCriteria(),
            new DefaultSortCriteria()
        );

        return new GetReviewCollectionWithPlaceByUserResponse($reviews);
    }
}