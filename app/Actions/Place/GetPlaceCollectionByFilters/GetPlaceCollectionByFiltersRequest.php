<?php

namespace Hedonist\Actions\Place\GetPlaceCollectionByFilters;


class GetPlaceCollectionByFiltersRequest
{
    private $category_id;
    private $location;
    private $page;

    public function __construct(int $page, ?int $category_id, ?string $location)
    {
        $this->category_id = $category_id;
        $this->location = $location;
        $this->page = $page;
    }

    public function getCategoryId(): ?int
    {
        return $this->category_id;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function getPage(): int
    {
        return $this->page;
    }
}