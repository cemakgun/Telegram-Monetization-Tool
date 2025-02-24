/**
 * MyButton Component
 * A simple button component that utilizes the UI Button component
 * to demonstrate usage within the application
 */

import { Button } from "./ui/button";

/**
 * MyButton Functional Component
 * Renders a button with the default variant and label "Click Me!"
 */
const MyButton = () => {
  return (
    <Button variant="default">Click Me!</Button>
  );
};

export default MyButton;
