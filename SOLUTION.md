# SOLUTION

## Estimation

Estimated: 5 hours

Spent: ~5 hours (dev time was just under 3h and around 2h I spent on researching how to pass regex and if its possible to pass it in the url query )

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
THEN I expect an element with test_id pagination-next_test-id to have color style set to #1e293b (as there are more that 12 products in the db)

WHEN I run test 2
THEN I expect for an api call to be triggered when an element with test_id subscription-checkbox_test-id is set to true state
THEN I expect for an api call to be triggered when value of the element with test_id query-input_test-id is more than 3 chars
THEN I expect for an api call to be triggered when value of the element with test_id price-input_test-id is 0 or more

WHEN I run test 3
THEN I expect for an api call to be triggered when an element with test_id pagination-next_test-id is pressed

WHEN I run test 4
THEN I expect the API call to http://localhost:3010/products to be mocked and fake data to be returned as an empty array
THEN I expect for the following text to be on the screen "No products to display"

```

## Next steps in order to improve the product

Improvements:

- Introducing typescript in order to improve the developer experience and performance as well as preventing unintentional bugs.
- Add real tests.
- Build component library by using a tool like Storybook, in order to improve the developer experience and performance, keeping consistancy, as well as avoiding bugs in a long run due to having one source of truth.
- Look into moving pagination into a separate component (yet if Storybook is implemented, then we might have a table component already implemented with pagination, but still they would be broken down into their own molucles in the end.)
- Add more filters and look into redesigning it for better UX (might need to rewrite the useEffect that triggeres the api call once more filters are added)
- Improve overall UI for mobile and desktop
- Add individual page for product
- Add SEO fo all pages

In order to complete the above inprovements it would require additional 14-16h

Thank you
