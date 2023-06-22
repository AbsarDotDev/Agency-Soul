import 'tailwindcss/tailwind.css'; // Importing the Tailwind CSS default styles

declare module 'tailwindcss/defaultTheme' {
  // Define the default theme interface
  interface DefaultTheme {
    screens: {
      [key: string]: string;
    };
  }
}
