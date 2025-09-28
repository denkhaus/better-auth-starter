# Quickstart: Manual Testing for Dark Mode

## Objective

Verify that the dark mode feature works as expected.

## Steps

1.  **Start the application**:
    ```bash
    npm run dev
    ```

2.  **Open the application** in your browser at `http://localhost:3000`.

3.  **Verify Initial State**:
    - The application should load in light mode by default.

4.  **Toggle to Dark Mode**:
    - Locate the sun/moon toggle button in the navigation bar.
    - Click the button.
    - **Expected**: The application smoothly transitions to a dark theme. The icon should now represent the light mode (e.g., a sun).

5.  **Toggle back to Light Mode**:
    - Click the toggle button again.
    - **Expected**: The application smoothly transitions back to the light theme. The icon should now represent the dark mode (e.g., a moon).

6.  **Verify Persistence (Dark Mode)**:
    - With the dark mode active, refresh the page.
    - **Expected**: The application should load and remain in dark mode.

7.  **Verify Persistence (Light Mode)**:
    - Switch back to light mode.
    - Refresh the page.
    - **Expected**: The application should load and remain in light mode.

8.  **Verify Cookie Fallback (Optional)**:
    - Open your browser's developer tools.
    - Disable Local Storage.
    - Repeat steps 4-7.
    - **Expected**: The theme should still persist between page reloads, this time using a cookie.
