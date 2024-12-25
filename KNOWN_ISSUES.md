# Known Issues

This file lists known issues or tasks that need to be resolved in the project.

## 1. Edit Rental

- **Issue**: Edit rental functionality is broken; fields are not populated properly.
- **Solution**: Implement field population logic when editing a rental.

## 2. Code Comments

- **Issue**: Code contains unnecessary comments.
- **Task**: Remove irrelevant comments and add meaningful ones where needed.

## 3. Authentication (Auth)

- **Issue**: Logged-in users can still access the login page, and non-logged-in users can access protected pages.
- **Solution**: Restrict access to login for logged-in users and redirect non-logged-in users appropriately.

## 4. Notifications

- **Issue**: Missing "Clear Notifications" button functionality.
- **Task**: Implement a button to clear all notifications.

## 5. Archive Rentals

- **Issue**: Rentals need a confirmation modal to confirm return date.
- **Task**:
  - Add a modal for confirmation.
  - Update the database if the return date is different from today's date.

## 6. Authentication (Auth) - Refresh Token

- **Issue**: Refresh token functionality is not working.
- **Solution**: Debug and fix the refresh token implementation.

## 7. Profile - Change Password

- **Issue**: Password change functionality does not work as expected.
- **Solution**: Fix the issue with the "Change Password" feature in the profile section.

## 8. Accessibility

- **Issue**: The app does not fully meet accessibility standards.
- **Task**:
  - Ensure proper ARIA labels are in place.
  - Add keyboard navigation support.
  - Improve contrast ratios and provide alt text for all images.
