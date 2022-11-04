import { ColorType } from "./theme";

declare module "styled-component" {
  export interface defaultTheme {
    colors: { [key in keyof ColorType]: ColorType[key] };
  }
}