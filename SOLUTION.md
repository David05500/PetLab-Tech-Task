# SOLUTION

## Estimation

Estimated: 5 hours

Spent: 6 hours

## Solution

In order to fulfill the requirements of this task and to keep the codebase scalable I will need to implement useContext for Products part of the app.
This will allow us to keep all the concerning data, logic and API calls in one place, yet available for all the components to consume

Apart from a state store I will require two more components:

- Filters - Would communicate with the Products Store in order to trigger API calls based on user selection of the filters.
- Index for all products - would pull data returned by the API from ProductsStrore to display it, it will also have buttons for pagination.

## Tests

```gherkin
WHEN I run test 1
THEN I expect the API call to http://localhost:3010/products to be mocked and fake data to be returned
THEN I expect the tests to check that the 12 products have been rendered
THEN I expect an element with test_id pagination-next_test-id to have styles set to text-gray-800 hover:bg-gray-300 (as there are more that 12 products) in the db

WHEN I run test 2
THEN I expect for an api call to be triggered when an element with test_id subscription-checkbox_test-id is set to true state
THEN I expect for an api call to be triggered when value of the element with test_id query-input_test-id is more than 3 chars
THEN I expect for an api call to be triggered when value of the element with test_id price-input_test-id is 0 or more

WHEN I run test 3
THEN I expect for an api call to be triggered when an element with test_id pagination-next_test-id is pressed
```

## Identifed edge cases after development + how I can build a better product

Edge cases:

- The API doesn't return the total number or items at the moment, therefore it made it a bit tricky to calculate whether there is a next page in the API. Due to this I have an empty page if the API returns the last 12 products (as I am requesting 12 per page and checking if 12 are returned then I assume there could be more on the back end). However, this is more of a limitation of my implementation and a workaround for this could be implemented.

Improvements:

- Introducing typescript in order to improve the developer experience and performance as well as preventing unintentional bugs and potentially easing out from too many test.
- Build component library by using a tool like Storybook, in order to improve the developer experience and performance, keeping consistancy, as well as avoiding bugs in a long run due to having one source of truth.
- Look into moving pagination into separate component (yet if Storybook component is implemented, then we might have a table component already implemented with pagination, but still they would be broken down into their own molucles in the end.)
- Add more filters and look into redesigning it for better UX
- Fix the empty page in pagination
- Improve overall UI for mobile and desktop
